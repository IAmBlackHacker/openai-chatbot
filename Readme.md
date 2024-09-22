# Chatbot Application
## Backend Server
### Dependencies
```
Python 3.10.9
```

### Install Packages
Install Virtual Environment
```bash
pytohn -m pip install virtualenv
```

Create Virtual Environment
```bash
python -m virtualenv venv
```

Activate Virtual Environment
```bash
source ./venv/bin/activate
```

Go Inside chatbot-backend folder in terminal
```bash
cd chatbot-backend
```

Install Dependencies
```bash
python -m pip install -r requirements.txt
```

Set API Key
```bash
export OPENAI_API_KEY=<YOUR_OPENAPI_KEY>
```

Start the backend server
```bash
python app.py
```

Check that backend server should be running at http://localhost:5001

## Frontend Server
### Install Dependencies
```
node v20.17.0
yarn 4.5.0
```

### Start Server
#### Go inside chatbot-ui
```bash
cd chatbot-ui
```

#### Start the server
```bash
yarn start
```

Check that frontend server should be running at http://localhost:3000
