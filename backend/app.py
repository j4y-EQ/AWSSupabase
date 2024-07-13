# backend/app.py

from flask import Flask, request, jsonify
import os
import fitz  # PyMuPDF

app = Flask(__name__)

# API to extract text from PDF
@app.route('/extract-text', methods=['POST'])
def extract_text():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.endswith('.pdf'):
        file_path = os.path.join("tests", file.filename)
        file.save(file_path)
        text = extract_text_from_pdf(file_path)
        return jsonify({"text": text})

    return jsonify({"error": "Unsupported file type"}), 400

def extract_text_from_pdf(file_path):
    document = fitz.open(file_path)
    text = ""
    for page_num in range(len(document)):
        page = document.load_page(page_num)
        text += page.get_text()
    return text

# if __name__ == '__main__':
#     app.run(debug=True)
