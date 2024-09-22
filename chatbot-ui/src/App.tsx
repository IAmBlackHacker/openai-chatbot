import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import './App.css';
import {FormControl, InputGroup, Form, Button} from "react-bootstrap";
import {BackendGETRequest, BackendPOSTRequest} from "./app/webrequests/BackendRequest";
import {QUERY_URL} from "./app/constants/Constant";

interface MessageInterface {
    name: string;
    message: string;
}

function SendMessage(message: string, setMessage: Dispatch<SetStateAction<MessageInterface[]>>) {
    BackendPOSTRequest(QUERY_URL, {
        "query": message
    }, (data) => {
        console.log(data.payload);
        setMessage(oldMessages => [...oldMessages, data.payload]);
    }, ()=>{})
}

function OnFormSubmit(event: any, setMessage: Dispatch<SetStateAction<MessageInterface[]>>) {
    event.preventDefault();
    setMessage(oldMessages => [...oldMessages, {
        name: "User",
        message: event.target.query.value
    }]);

    SendMessage(event.target.query.value, setMessage);
    return false;
}

function App() {
    const [messages, setMessages] = useState<MessageInterface[]>([]);
    const [inputQuery, SetInputQuery] = useState("");
    const chatBox = useRef(document.createElement("div"));

    useEffect(() => {
        chatBox.current.scrollTo({top: chatBox.current.scrollHeight, behavior: 'smooth'});
    }, [messages]);

    return (
        <div className="App d-flex">
            <div className={"container d-flex p-3"}>
                <div className={"p-2 flex-fill d-flex bg-light border rounded"}>
                    <div className={"d-flex flex-column flex-fill overflow-hidden border rounded"}>
                        <div className={"d-flex flex-column flex-grow-1 bg-white overflow-hidden pb-3"}>
                            <div className={"bg-dark text-white p-2 text-center"}>
                                Chatbot UI
                            </div>
                            <div ref={chatBox} className={"flex-grow-1 overflow-scroll"}>
                                <div className={"p-2 px-3"}>
                                    {
                                        messages.map((message, index) => <div key={"message_" + index} className={`${message.name == "User"? "bg-primary text-white float-start": "bg-secondary-subtle float-end"} p-2 my-2 rounded w-75`}>
                                            <p className={"m-0 fw-bold"}>{message.name}</p>
                                            <p className={"m-0"}>{message.message}</p>
                                        </div>)
                                    }
                                </div>
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
