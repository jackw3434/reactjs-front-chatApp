import React from 'react';
import MessageItem from './MessageItem';
import socketIOClient from 'socket.io-client';
import { sendMessageToFriend } from './axiosFunctions/friendRequestFunctions';

export default class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: socketIOClient("http://localhost:7000"),
            message: ""
        };
    }

    componentWillReceiveProps() {
        let messageContainer = document.getElementById('chatWindow');
        messageContainer.innerHTML = "";
    };

    componentWillReceiveProps() {
        let { socket } = this.state;
        if (this.props.friendInstance.friend && this.props.friendInstance.messageLog) {
            console.log("Leaving Room ", this.props.friendInstance.friend.first_name + ' room');
            socket.emit("leave-room", this.props.friendInstance.friend.first_name + ' room');
        }
    };
    sendMessage() {
        // post message to db
        let emailOfMessageSender = this.props.loggedInUserEmail;
        let nameOfMessageSender = this.props.loggedInUserName;
        let message = this.refs.messageInput.value;

        let friendShipID = this.props.friendInstance.friendshipID;

        let messageobjectToSend = {
            emailOfMessageSender,
            nameOfMessageSender,
            message
        }

        sendMessageToFriend(friendShipID, messageobjectToSend).then(response => {
            console.log("sendmessage responsse ", response)
        })

        console.log(friendShipID, messageobjectToSend);

        if (this.props.friendInstance.friend && this.props.friendInstance.messageLog) {
            this.appendMessage("You: " + this.refs.messageInput.value);
            this.state.socket.emit('send-chat-message', this.refs.messageInput.value, this.props.friendInstance.friend.first_name + ' room');
        }
        this.refs.messageInput.value = "";
    };

    appendMessage(message) {
        let messageElement = document.createElement('div');

        let messageContainer = document.getElementById('chatWindow');

        messageElement.innerText = message;
        if (messageContainer) {
            messageContainer.append(messageElement);
        }
    
    }

    render() {
        let { socket } = this.state;

        let name, messageLog;

        socket.emit("new-user", this.props.loggedInUserName);
        socket.emit('create', this.props.loggedInUserName + ' room');

        if (this.props.friendInstance.friend && this.props.friendInstance.messageLog) {
            console.log("joined ", this.props.friendInstance.friend.first_name + ' room');
            socket.emit("join", this.props.friendInstance.friend.first_name + ' room', this.props.loggedInUserName);

            socket.on("message", message => {
                console.log("here", message);
                messageLog += message;
                this.setState({ message: message });
                this.appendMessage(message.name + ": " + message.message);
            });
        }


        if (this.props.friendInstance.friend && this.props.friendInstance.messageLog) {
            name = this.props.friendInstance.friend.first_name;
            messageLog = this.props.friendInstance.messageLog;
        }

        return (
            <div>
                {name &&
                    <p>Chat Window, {name}</p>
                }
                <div id="chatWindow" style={{ display: "flex", flexDirection: "column", backgroundColor: "#36393F", width: "80%", height: "60%", overflow: "auto", position: "absolute", bottom: 90 }}>

                    {messageLog && messageLog.map((message, index) =>
                        // <div style={{ fontSize: 10, border: "1px solid white", padding: 5, margin: 5 }} key={index}>                            
                        //     <p>{message.nameOfMessageSender}</p>
                        //     <p>{message.message}</p>
                        //     <p>{message.date_sent}</p>
                        // </div>
                        <div style={{ backgroundColor: "#36393F", width: "80%", height: "50%", marginLeft: 30, paddingLeft: 10, borderTop: "1px solid white", display: "flex", flexDirection: "row", }} key={index}>
                            <p>{message.nameOfMessageSender} : </p>
                            <p>"{message.message}"</p>
                        </div>

                    )}
                </div>
                <div style={{ display: "flex", backgroundColor: "#40444B", position: "absolute", bottom: 25, width: "70%", height: 50, border: "1px solid white" }}>
                    <input style={{ width: "70%", fontSize: "80%", color: "white", paddingLeft: 10, backgroundColor: "#40444B", border: "0px" }} id="messageInput" type="text" ref="messageInput" />
                    <button style={{ width: "30%" }} id="send-button" onClick={() => this.sendMessage()}>Send</button>
                </div>
            </div>
        )
    }
}