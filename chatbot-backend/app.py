from flask import Flask
from flask import request
from flask_cors import CORS
from llmservice import ask_question

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}}, supports_credentials=True)

@app.route('/')
def home_url():
    return 'Hi From ChatBot Backend'

@app.route('/api/health')
def health_url():
    return 'OK'

@app.route('/api/query', methods = ['POST'])
def hello_from_server():
    data = request.get_json()
    return {
        "status": "SUCCESS",
        "payload": {
            "name": "Bot",
            "message": ask_question(data['query'])
        }
    }

if __name__ == '__main__':

    # run() method of Flask class runs the application
    # on the local development server.
    app.run(host='0.0.0.0', port=5001)
