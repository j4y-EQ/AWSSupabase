# TootToot

TootToot: The app that gives you an easier way to study your stuff so you don't go toot-toot.

## About TootToot

**TootToot** is a designed to revolutionize the way you study. Leveraging advanced AI and seamless integration with modern cloud services, TootToot offers an interactive and user-friendly platform to enhance your learning experience. 

### How It Works

TootToot works as the student uploads a PDF file of their notes, and we create flashcards based on the content.

### Features

#### File Reader
- **Supported Formats**: Effortlessly read and process PDF and text files.
- **Future Support**: Potential to include image to text conversion, expanding accessibility and functionality.

#### Flashcard Generation
- **Automatic Flashcards**: Automatically generate flashcards for efficient revision sessions.
- **User-Friendly Interface**: Focus on learning without the clutter of unnecessary analytics.

### Technologies Used

- **Flask**: Web framework for developing scalable and robust applications.
- **React**: Provides frontend
- **PyMuPDF**: Powerful library for PDF text extraction.
- **Supabase**: Provides a backend as a service for database management.
- **Amazon Bedrock**: Utilized for AI-driven text processing and flashcard generation.
- **boto3**: AWS SDK for seamless integration with various Amazon services.
- **dotenv**: Manage environment variables securely and efficiently.

## API Endpoints

### Extract Text and Generate Flashcards

#### `POST /extract-text`
- **Description**: Extracts text from an uploaded PDF and generates flashcards.
- **Request**:
  - `file`: PDF file to be uploaded.
  - `user_id`: ID of the user.
  - `flashcard_name`: Name for the set of flashcards.
- **Response**:
  - `text`: Cleaned text extracted from the PDF.
  - `text_supabase_response`: Response from Supabase after inserting text.
  - `flashcards`: Generated flashcards in JSON format.
  - `flashcards_supabase_response`: Response from Supabase after inserting flashcards.

### Get All Flashcards

#### `GET /flashcards`
- **Description**: Retrieves all flashcards from the database.
- **Response**:
  - List of all flashcards with their details.

### Get Flashcard by ID

#### `GET /flashcards/<int:flashcard_id>`
- **Description**: Retrieves a specific flashcard by its ID.
- **Request Parameter**:
  - `flashcard_id`: ID of the flashcard to be retrieved.
- **Response**:
  - Details of the specified flashcard.
