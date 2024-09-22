import React, {Dispatch, SetStateAction, useState} from 'react';
import './App.css';
import {FormControl, InputGroup, Form, Button} from "react-bootstrap";

interface MessageInterface {
    name: string;
    message: string;
}

function OnFormSubmit(event: any, setMessage: Dispatch<SetStateAction<MessageInterface[]>>) {
    event.preventDefault();
    setMessage(oldMessages => [...oldMessages, {
        name: "User",
        message: event.target.query.value
    }]);
    return false;
}

function App() {
    const [messages, setMessages] = useState<MessageInterface[]>([]);
    const [inputQuery, SetInputQuery] = useState("");

    return (
        <div className="App d-flex">
            <div className={"container d-flex p-3"}>
                <div className={"p-2 flex-fill d-flex bg-light border rounded"}>
                    <div className={"d-flex flex-column flex-fill overflow-hidden border rounded"}>
                        <div className={"flex-grow-1"}>
                            <div className={"bg-dark text-white p-2 text-center"}>
                                Chatbot UI
                            </div>
                            <div className={"p-2"}>
                                {
                                    messages.map((message, index) => <div key={"message_" + index} className={"bg-success p-2 my-2 text-white rounded"}>
                                        <p className={"m-0 fw-bold"}>{message.name}</p>
                                        <p className={"m-0"}>{message.message}</p>
                                    </div>)
                                }
                            </div>
                        </div>
                        <Form onSubmit={(event) => {
                            SetInputQuery("");
                            OnFormSubmit(event, setMessages);
                        }}>
                        <InputGroup className={""}>
                            <Form.Control
                                className={"shadow-none"}
                                placeholder="User Query"
                                name={"query"}
                                value={inputQuery}
                                onChange={(event) => {SetInputQuery(event.target.value);}}
                            />
                            <Button variant="primary" id="button-addon2">
                                Send
                            </Button>
                        </InputGroup>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
