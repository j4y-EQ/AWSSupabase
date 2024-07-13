###################################################################################################
# Import and Initializing

from flask import Flask, request, jsonify
import os
import fitz  # PyMuPDF
from supabase import create_client, Client
from dotenv import load_dotenv
import json
import boto3
import logging
import re

app = Flask(__name__)
load_dotenv()

# Configure logging
# logging.basicConfig(level=logging.DEBUG)

###################################################################################################
# SUPABASE
supabase_url = os.getenv('SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_ANON_KEY')
supabase: Client = create_client(supabase_url, supabase_key)


def insert_text_to_supabase(user_id, text):
    data = {
        "user_id": user_id,
        "text": text
    }
    response = supabase.table('user_texts').insert(data).execute()
    return response


def insert_flashcards_to_supabase(user_id, flashcards, flashcard_name):
    data = {
        "user_id": user_id,
        "flashcards_json": flashcards,
        "flashcard_name": flashcard_name
    }
    response = supabase.table('flashcards').insert(data).execute()
    return response



###################################################################################################
# Amazon Bedrock Titan Model

bedrock_client = boto3.client(
    'bedrock-runtime',
    region_name=os.getenv('AWS_DEFAULT_REGION'),
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    aws_session_token=os.getenv('AWS_SESSION_TOKEN'),
)


def get_flashcards_from_titan(text):
    """Generate flashcards using Amazon Titan Model."""
    global bedrock_client
    body = json.dumps({
        "prompt": text,
        "max_tokens_to_sample": 4000,
        # "temperature": 0.1,  # Use a lower value to decrease randomness in responses.
        # "topP": 0.1, # Use a lower value to ignore less probable options and decrease the diversity of responses.

    })

    try:
        print(f"Request body for Model: {body}")
        response = bedrock_client.invoke_model(
            body=body,
            modelId="anthropic.claude-v2",  # Replace with your actual model ID if different
            accept="application/json",
            contentType="application/json",
        )

        response_body = json.loads(response.get("body").read().decode("utf-8"))
        print(f"Response from Titan Model: \n\n{response_body["completion"]}")
        response_text = response_body["completion"]
        start_index = response_text.find("[")
        end_index = response_text.rfind("]") + 1
        json_string = response_text[start_index:end_index]
        flashcards = json.loads(json_string)
        print("PRETTY RESPONSE:")
        print(json.dumps(flashcards, indent=2))

        # Assuming the response contains flashcards in a JSON format
        # flashcards_text = response_body.get("completion", "")
        # flashcards = parse_flashcards_from_text(flashcards_text)
        return flashcards

    except boto3.exceptions.Boto3Error as e:
        print(f"Boto3 error: {str(e)}")
        raise e
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        raise e

###################################################################################################
# FUNCTIONS


def extract_text_from_pdf(file_path):
    """Extract text from PDF."""
    document = fitz.open(file_path)
    text = ""
    for page_num in range(len(document)):
        page = document.load_page(page_num)
        text += page.get_text()
    return text


def clean_text_for_titan(text):
    """
    Clean and format text before sending to Amazon Titan Model.
    """
    # Remove email headers
    cleaned_text = re.sub(r'From:.*\n', '', text)
    cleaned_text = re.sub(r'To:.*\n', '', cleaned_text)
    cleaned_text = re.sub(r'Subject:.*\n', '', cleaned_text)
    cleaned_text = re.sub(r'Date:.*\n', '', cleaned_text)

    # Remove attachment information
    cleaned_text = re.sub(r'attachments.*\n', '', cleaned_text)
    cleaned_text = re.sub(r'guest_check_in_attachment.*\n', '', cleaned_text)

    # Replace special characters and multiple spaces/newlines
    # Replace multiple spaces with a single space
    cleaned_text = re.sub(r'\s+', ' ', cleaned_text)
    # Replace multiple newlines with a single newline
    cleaned_text = re.sub(r'\n+', '\n', cleaned_text)

    # Add clear instructions for generating flashcards
    instruction_text = '''\n\nHuman:Please use the following text to create 10 flashcards
    in a JSON format, where the questions are derived from the following text, do not put newlines in your response:\n\n
    
    '''
    final_text = instruction_text + cleaned_text.strip() + "\n\nAssistant:"

    return final_text

###################################################################################################
# API FROM HERE ONWARDS


@app.route('/extract-text', methods=['POST'])
def extract_text():
    """API to extract text from PDF."""
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    user_id = int(request.form.get('user_id'))
    if not user_id:
        return jsonify({"error": "No user_id provided"}), 400

    flashcard_name = request.form.get('flashcard_name')
    if not flashcard_name:
        return jsonify({"error": "No flashcard name provided"}), 400

    if file and file.filename.endswith('.pdf'):
        file_path = os.path.join("uploaded_files", file.filename)
        file.save(file_path)
        text = extract_text_from_pdf(file_path)

        # Insert text into Supabase
        text_response = insert_text_to_supabase(user_id, text)

        # Clean text & ADD PROMPT before sending to Model
        cleaned_text = clean_text_for_titan(text)

        # Generate flashcards from the extracted text using Titan
        flashcards = get_flashcards_from_titan(cleaned_text)

        # Insert flashcards into Supabase
        flashcards_response = insert_flashcards_to_supabase(user_id, flashcards, flashcard_name)

        return jsonify({
            "text": cleaned_text,
            "text_supabase_response": text_response.data,
            "flashcards": flashcards,
            "flashcards_supabase_response": flashcards_response.data
        })

    return jsonify({"error": "Unsupported file type"}), 400


if __name__ == '__main__':
    app.run(debug=True)
