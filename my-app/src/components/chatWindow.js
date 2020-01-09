import React from 'react';
import MessageItem from './MessageItem';
import socketIOClient from 'socket.io-client';
import { sendMessageToFriend } from './axiosFunctions/friendRequestFunctions';

export default class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: socketIOClient("http://localhost:7000"),
            message: "",
            currentScroll: ""
        };
    }

    componentDidMount() {
        this.setState({ currentScroll: document.querySelector('#chatWindow').scrollHeight - document.querySelector('#chatWindow').scrollTop })
    }
    componentDidUpdate() {
        let messageContainer = document.getElementById('chatWindow');
        messageContainer.scrollTo(0, document.querySelector('#chatWindow').scrollHeight);
    }

    componentWillReceiveProps() {
        let { socket } = this.state;
        if (this.props.friendInstance.friend && this.props.friendInstance.messageLog) {
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
            //  console.log("sendmessage responsse ", response)
        })

        // console.log(friendShipID, messageobjectToSend);

        if (this.props.friendInstance.friend && this.props.friendInstance.messageLog) {
            this.appendMessage("You: " + new Date().getHours() + ":" + new Date().getMinutes() + "\n" + this.refs.messageInput.value);
            this.state.socket.emit('send-chat-message', this.refs.messageInput.value, this.props.friendInstance.friend.first_name + ' room');
        }
        this.refs.messageInput.value = "";

        let messageContainer = document.getElementById('chatWindow');
        messageContainer.scrollTo(0, document.querySelector('#chatWindow').scrollHeight);
    };

    enterPressed(event) {
        var code = event.keyCode || event.which;
        if (code === 13) { //13 is the enter keycode
            this.sendMessage();
        }
    }

    appendMessage(message) {
        console.log(message);
        let messageContainer = document.getElementById('chatWindow');
        let messageElement = document.createElement('div');
        messageElement.style = "padding: 10px; margin-left: 30px; border-top: 1px solid white; width: 80%; height: 80px;";

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
            socket.emit("join", this.props.friendInstance.friend.first_name + ' room', this.props.loggedInUserName);

            socket.on("message", message => {
                var scrollDown = false;
                if (this.state.currentScroll == document.querySelector('#chatWindow').scrollHeight - document.querySelector('#chatWindow').scrollTop) {
                    scrollDown = true;
                }
                //get current scroll position

                //if current scroll position
                this.appendMessage(message.name + ": " + message.message);
                if (scrollDown) {
                    let messageContainer = document.getElementById('chatWindow');
                    messageContainer.scrollTo(0, document.querySelector('#chatWindow').scrollHeight);
                }
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
                <div id="chatWindow" style={{ display: "flex", flexDirection: "column", backgroundColor: "#36393F", width: "80%", height: "75%", overflow: "auto", position: "absolute", bottom: 90 }}>
                    {messageLog && messageLog.map((message, index) =>
                        <div style={{ backgroundColor: "#36393F", width: "80%", height: "100%", marginLeft: 30, paddingLeft: 10, borderTop: "1px solid white" }} key={index}>
                            <div style={{ display: "flex", flexDirection: "row", height: "40px" }}>
                                <p>{message.nameOfMessageSender}</p>
                                <p style={{ fontSize: "15px", marginTop: "43px", marginLeft: "10px" }}>{new Date(message.date_sent).getHours()}:{new Date(message.date_sent).getMinutes()}</p>
                            </div>
                            <p style={{ fontSize: "20px", marginTop: "30px" }}>{message.message}</p>
                        </div>
                    )}
                </div>
                <div style={{ display: "flex", backgroundColor: "#40444B", position: "absolute", bottom: 25, width: "70%", height: 50, border: "1px solid white" }}>
                    <input onKeyPress={this.enterPressed.bind(this)} style={{ width: "70%", fontSize: "80%", color: "white", paddingLeft: 10, backgroundColor: "#40444B", border: "0px" }} id="messageInput" type="text" ref="messageInput" />
                    <button style={{ width: "30%" }} id="send-button" onClick={() => this.sendMessage()}>Send</button>
                </div>
            </div>
        )
    }
}