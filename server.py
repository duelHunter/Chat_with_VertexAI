from flask import Flask, request
import vertexai
from vertexai.generative_models import GenerativeModel, ChatSession
from flask_cors import CORS
from dotenv import load_dotenv
import os
import pymongo


load_dotenv()
# Get environment variables from .env file
project_id = os.getenv("PROJECT_ID")
location = os.getenv("LOCATION")
# get url from .env file
mongoURL = os.getenv("Mongo_URL")


######database initalization
# define and assign client object
client = pymongo.MongoClient(mongoURL)
# databse name is chatHistoryDB
dbase = client['chatHistoryDB']

# collection(table) name is chatHistoryCol
collection = dbase['chatHistoryCol']

#####vertex AI part
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

#####Define flask as app 
app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def historyRetrieve():
    if request.method == 'POST':
        #get all history values as a list 
        hisList = list(collection.find())
        new_his_list = [{key: value for key, value in doc.items() if key != '_id'} for doc in hisList]
        return new_his_list

@app.route('/gpt', methods=['POST'])
def call_to_AI():
    if request.method == 'POST':
        message_json = request.json
        message = message_json.get("message")

        print(message)
        reply = get_chat_response(chat, message)
        #create dictionary
        document = {"message":message, "reply":reply}
        #insert message and reply to databse
        collection.insert_one(document)
        return reply

if __name__ == '__main__':
   app.run(port=5000)

#follow me on
#https://github.com/duelHunter/
