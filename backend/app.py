###################################################################################################
# Import and Intialising

from flask import Flask, request, jsonify
import os
import fitz  # PyMuPDF
from supabase import create_client, Client
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()

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

###################################################################################################
# FUNCTIONS

def extract_text_from_pdf(file_path):
    document = fitz.open(file_path)
    text = ""
    for page_num in range(len(document)):
        page = document.load_page(page_num)
        text += page.get_text()
    return text

###################################################################################################
# API FROM HERE ONWARDS

# API to extract text from PDF
@app.route('/extract-text', methods=['POST'])
def extract_text():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    user_id = request.form.get('user_id')
    if not user_id:
        return jsonify({"error": "No user_id provided"}), 400

    if file and file.filename.endswith('.pdf'):
        file_path = os.path.join("tests", file.filename)
        file.save(file_path)
        text = extract_text_from_pdf(file_path)
        
        # Insert text into Supabase
        response = insert_text_to_supabase(user_id, text)
        
        return jsonify({"text": text, "supabase_response": response.data})

    return jsonify({"error": "Unsupported file type"}), 400



# if __name__ == '__main__':
#     app.run(debug=True)
