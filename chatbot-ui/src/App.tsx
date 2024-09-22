import React from 'react';
import './App.css';
import {FormControl, InputGroup, Form, Button} from "react-bootstrap";

function App() {
  return (
    <div className="App d-flex">
        <div className={"container d-flex p-3"}>
            <div className={"p-2 flex-fill d-flex bg-light border rounded"}>
            <div className={"d-flex flex-column flex-fill overflow-hidden border rounded"}>
                <div className={"flex-grow-1"}>
                    <div className={"bg-dark text-white p-2 text-center"}>
                        Chatbot UI
                    </div>
                </div>
                <InputGroup className="">
                    <Form.Control
                        placeholder="User Query"
                        aria-label="query"
                        aria-describedby="basic-addon1"
                    />
                    <Button variant="primary" id="button-addon2">
                        Send
                    </Button>
                </InputGroup>
            </div>
            </div>
        </div>
    </div>
  );
}

export default App;
