## Description
Google Cloud Platform offers a variety of services for developers. Among these services, **Vertex AI Agent Builder** allows developers to create and deploy enterprise-ready generative AI solutions with ease.

Vertex AI is a sophisticated platform designed for developing and managing complex AI models. The Vertex AI API for Gemini enables the creation of applications using Gemini models.

Our application leverages this API for text generation, helping users solve a wide range of problems with Vertex AI. The frontend is built using the React framework, while the backend server operates on Flask. The database is managed with MongoDB.

## Installation

To install and run the project on your local computer, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/duelHunter/Chat_with_VertexAI.git
    ```

2. **Navigate to the project directory**:
    ```sh
    cd client
    ```

3. **Install dependencies**:
    ```sh
    npm install
    ```

## Usage

To start the development server, run:
```sh
npm start
```

Next, we will set up the server part.
The server is running with Python Flask.
1. Download and Install Python on your computer:[python.org](https://www.python.org/)
2. Install these modules.
    ```sh
    pip install Flask
    ```
    ```sh
    pip install Flask-CORS
    ```
    ```sh
    pip install python-dotenv
    ```
    ```sh
    pip install pymongo
    ```

3. Set Up MongoDB Locally:

    * Download MongoDB: Go to the MongoDB Download Center and download the Community Server version suitable for your operating system.
    * Install MongoDB: On Windows, run the downloaded `.msi` installer.

4. Run MongoDB: Open a Command Prompt and start MongoDB with:
    ```sh
    "C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe"
    ```

    MongoDB will now be running locally on `mongodb://localhost:27017`.


5. Create a new `.env` file in the root folder and replace these environment variables with your own.
     ```sh
      PROJECT_ID = your-project-id
      LOCATION = your-location
      Mongo_URL = mongodb://localhost:27017
     ```

   To find your PROJECT_ID:

    * Go to the [Google Cloud Console](https://console.cloud.google.com/).
    * Sign in with your Google account if you are not already signed in.
    * In the top navigation bar, click on the project dropdown.
    * Click on the "New Project" button or select an existing project.
    * If creating a new project, fill in the necessary information and click "Create".
    * Once your project is created or selected, your PROJECT_ID will be displayed in the project info card on the dashboard.
    * Alternatively, you can find the PROJECT_ID by clicking on the "Manage Resources" tab and viewing the list of your projects.


6. Now navigate to the root directory and run `server.py`.
    ```sh
    cd ..
    ```
    ```sh
    python server.py
    ```


## Author
[99xdilshan@gmail.com](mailto:99xdilshan@gmail.com)

Project Link: https://github.com/duelHunter/Chat_with_VertexAI
