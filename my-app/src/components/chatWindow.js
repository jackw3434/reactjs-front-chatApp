import React from 'react';
import MessageItem from './MessageItem';
import socketIOClient from 'socket.io-client';

export default class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: socketIOClient("http://localhost:7000"),
        };
    }

    componentDidUpdate() {
        let { socket } = this.state;

        socket.emit('create', this.props.loggedInUserName+'s room');

       

        socket.on("chat-message", data => {
            this.appendMessage(data.name + ": " + data.message);
        });

        socket.emit("new-user", "chat window " + this.props.loggedInUserName);
    };

    sendMessage() {
        this.appendMessage("You: " + this.refs.messageInput.value);
        this.state.socket.emit('send-chat-message', this.refs.messageInput.value);
        this.refs.messageInput.value = "";
    };

    appendMessage(message) {
        // console.log(message);
        let messageElement = document.createElement('div');
        let messageContainer = document.getElementById('chatWindow');

        messageElement.innerText = message;
        if (messageContainer) {
            messageContainer.append(messageElement);
        }
    }

    render() {

        let messageContainer = document.getElementById('chatWindow');


        let { socket } = this.state;

        console.log(this.props.appendMessage);
        let name, messageLog;

        if (this.props.friendInstance.friend && this.props.friendInstance.messageLog) {
            name = this.props.friendInstance.friend.first_name;
            messageLog = this.props.friendInstance.messageLog
            socket.emit("join", name+'s room');
        }

        
        //if (this.state.view && this.state.userFirstName) {
        //    this.appendMessage("You Joined");
        //    socket.emit("new-user", "chat window "+this.props.loggedInUserName);
        // }

        // socket.on("user-connected", name => {
        //     this.appendMessage(name + " connected");
        // });

        // socket.on("user-disconnected", name => {
        //     this.appendMessage(name + " disconnected");
        // });

        return (
            <div>
                <p>Chat Window, {name}</p>
                <div id="chatWindow" style={{ display: "flex", flexDirection: "column", backgroundColor: "#36393F", width: "80%", height: "80%", overflow: "auto", position: "absolute" }}>

                    {messageLog && messageLog.map((message, index) =>
                        <div style={{ fontSize: 10, border: "1px solid white", padding: 5, margin: 5 }} key={index}>
                            <p>{message.date_sent}</p>
                            <p>{message.nameOfMessageSender}</p>
                            <p>{message.message}</p>
                        </div>
                    )}
                </div>
                <div style={{ display: "flex", backgroundColor: "#40444B", position: "absolute", bottom: 25, width: "70%", height: 50 }}>
                    <input style={{ width: "70%", fontSize: "80%", color: "white", paddingLeft: 10, backgroundColor: "#40444B", border: "0px" }} id="messageInput" type="text" ref="messageInput" />
                    <button style={{ width: "30%" }} id="send-button" onClick={() => this.sendMessage()}>Send</button>
                </div>
            </div>
        )
    }
}