from flask import Flask, request
import vertexai
from vertexai.generative_models import GenerativeModel, ChatSession
from flask_cors import CORS
from dotenv import load_dotenv
import os


load_dotenv()
# Get environment variables from .env file
project_id = os.getenv("PROJECT_ID")
location = os.getenv("LOCATION")


vertexai.init(project=project_id, location=location)

# Initialize the generative model
model = GenerativeModel(model_name="gemini-1.0-pro-002") 

# Start a chat session with the model
chat = model.start_chat()

def get_chat_response(chat: ChatSession, prompt: str) -> str:
    text_response = []
    responses = chat.send_message(prompt, stream=True)
    for chunk in responses:
        text_response.append(chunk.text)
    return "".join(text_response)

#Define flask as app 
app = Flask(__name__)
CORS(app)

@app.route('/gpt', methods=['POST'])
def call_to_AI():
    if request.method == 'POST':
        message_json = request.json
        message = message_json.get("message")

        print(message)
        reply = get_chat_response(chat, message)
        return reply

if __name__ == '__main__':
   app.run(port=5000)





