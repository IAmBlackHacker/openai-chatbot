# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from idlelib.rpc import request_queue

from flask import Flask

# Flask constructor takes the name of
# current module (__name__) as argument.
app = Flask(__name__)

# The route() function of the Flask class is a decorator,
# which tells the application which URL should call
# the associated function.
@app.route('/')
# ‘/’ URL is bound with hello_world() function.
def home_url():
    return 'Hi From ChatBot Backend'

@app.route('/api/health')
def health_url():
    return 'OK'

@app.route('/api/query')
def hello_from_server(request):
    print(request)
    return {
        "status": "OK"
    }

# def get_gpt4_response(query):
#     api_url = "https://api.openai.com/v1/engines/gpt-4/completions"
#     headers = {
#         "Authorization": f"Bearer YOUR_API_KEY",
#         "Content-Type": "application/json"
#     }
#     data = {
#         "prompt": query,
#         "max_tokens": 150
#     }
#     response = requests.post(api_url, headers=headers, json=data)
#     return response.json().get('choices')[0].get('text').strip()

# main driver function
if __name__ == '__main__':

    # run() method of Flask class runs the application
    # on the local development server.
    app.run(host='0.0.0.0', port=5001)
