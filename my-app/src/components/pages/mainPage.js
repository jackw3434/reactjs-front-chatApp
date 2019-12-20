import React from 'react';
import '../../App.css';
import UserList from '../UserList';
import MessegeItem from '../MessegeItem';
import LoginPage from '../pages/loginPage';
import { getUsers } from '../../functions/userFunctions/userFunctions';
import socketIOClient from 'socket.io-client';
const socket = socketIOClient("http://localhost:7000");

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            message: "",
            response: "",
            view: true,
            name: prompt("What is your name?")
        };
    }

    componentDidMount() {
        getUsers().then(response => {
            this.setState({ users: response });
        })
    };

    componentDidUpdate() {
        socket.on("chat-message", data => {
            this.appendMessage(data.name + ": " + data.message);
        });

        if (this.state.view) {
            //let name = prompt("What is your name?")

            this.appendMessage("You Joined");
            socket.emit("new-user", this.state.name);
        }


        socket.on("user-connected", name => {
            this.appendMessage(name + " connected");
        });

        socket.on("user-disconnected", name => {
            this.appendMessage(name + " disconnected");
        });
    };

    changeListState(response) {
        this.setState({ users: response });
    };

    changeView() {
        this.setState(prevState => ({
            view: !prevState.view
        }));
    };


    sendMessege() {
        this.appendMessage("You: " + this.refs.messageInput.value);
        socket.emit('send-chat-message', this.refs.messageInput.value);
        this.refs.messageInput.value = "";
    }

    appendMessage(message) {
        let messageElement = document.createElement('div');
        let messageContainer = document.getElementById('chatWindow');

        messageElement.innerText = message;
        if (messageContainer) {
            messageContainer.append(messageElement);
        }

        // messageContainer.append(<MessegeItem userMessage={message}></MessegeItem>);
    }

    render() {
        return (
            <div className="App-container">
                <div className="friendsList" style={{ backgroundColor: "#2F3136", width: "20%" }}>
                    <p>Friends List</p>
                    <UserList
                        view={(res) => this.changeListState(res)}
                        users={this.state.users}
                        listTitle="My User List">
                    </UserList>
                </div>
                <div className="chatWindow" style={{ backgroundColor: "#36393F", width: "80%", height: "100vh" }}>
                    <p>Chat Window</p>
                    <button style={{ width: "30%" }} id="changeView" onClick={() => this.changeView()}>change view</button>
                    {this.state.view ?
                        <div>
                            <div id="chatWindow" style={{ display: "flex", flexDirection: "column", backgroundColor: "#36393F", width: "80%", height: "80%", overflow: "auto", position: "absolute" }}>
                                <MessegeItem userMessage={this.state.response}></MessegeItem>
                            </div>

                        </div>
                        :
                        <LoginPage></LoginPage>

                    }
                    <div style={{ display: "flex", backgroundColor: "#40444B", position: "absolute", bottom: 25, width: "70%", height: 50, }}>
                        <input style={{ width: "70%", fontSize: "80%", color: "white", paddingLeft: 10, backgroundColor: "#40444B", border: "0px" }} id="messageInput" type="text" ref="messageInput" />
                        <button style={{ width: "30%" }} id="send-button" onClick={() => this.sendMessege()}>Send</button>
                    </div>
                </div>
            </div>
        );
    }
}