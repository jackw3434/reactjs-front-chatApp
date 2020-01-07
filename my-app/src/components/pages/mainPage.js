import React from 'react';
import '../../App.css';
import UserList from '../UserList';
import MessageItem from '../MessageItem';
import LoginPage from '../pages/loginPage';
import { getUsers } from '../axiosFunctions/userFunctions';
import { sendFriendRequest, getMyFriendRequests, getMyFriendsList } from '../axiosFunctions/friendRequestFunctions';
import socketIOClient from 'socket.io-client';
import { Redirect } from "react-router-dom";

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            message: "",
            response: "",
            logoutUser: false,
            view: true,
            socket: socketIOClient("http://localhost:7000"),
            userFirstName: localStorage.getItem("first_name"),
            userSurname: localStorage.getItem("surname"),
            userEmail: localStorage.getItem("email"),
            friendRequests: [],
            friendsList: []
        };
    }

    componentDidMount() {

        if (localStorage.length === 0) {
            console.log("redirecting, localStorage.length===0");
            return <Redirect to='/login' />;
        } else {

            getUsers().then((response, err) => {

                if (err) {
                    console.log("get user err", err)
                }

                getMyFriendRequests().then(foundFriendRequests => {
                    console.log("foundFriendRequests ", foundFriendRequests);
                    getMyFriendsList().then(foundfriendsList => {
                        console.log("foundfriendsList ", foundfriendsList);

                        let friends = [];
                        let userEmail = localStorage.getItem("email");

                        foundfriendsList.map((userFriends) => {
                            userFriends.friendObjects.map(friend => {
                                if (friend.email !== userEmail) {
                                    friends.push(friend);
                                }
                                return friends;
                            })
                            return userFriends;
                        })
                        this.setState({
                            friendsList: friends,
                            friendRequests: foundFriendRequests
                        });
                    })
                })
            })
        }
    };

    componentDidUpdate() {

        let { socket } = this.state;

        socket.on("chat-message", data => {
            this.appendMessage(data.name + ": " + data.message);
        });

        if (this.state.view && this.state.userFirstName) {
            this.appendMessage("You Joined");
            socket.emit("new-user", this.state.userFirstName);
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

    logout() {
        localStorage.clear();
        this.state.socket.close();
        this.setState({ userFirstName: "", userSurname: "", userEmail: "" });
        this.setState(prevState => ({
            logoutUser: !prevState.logoutUser
        }));
    };

    sendFriendRequest() {
        let friendEmail = this.refs.friendEmail.value;

        if (friendEmail === "") {
            console.log("Missing for field");
        } else {
            sendFriendRequest(friendEmail).then(response => {

                getMyFriendRequests().then(foundFriendRequests => {
                    this.setState({ friendRequests: foundFriendRequests });
                })

                getMyFriendsList().then(foundfriendsList => {
                    console.log("Accepted, getting LIST! ", foundfriendsList);

                    let friends = [];
                    let userEmail = localStorage.getItem("email");

                    foundfriendsList.map((userFriends) => {
                        userFriends.friendObjects.map(friend => {
                            if (friend.email !== userEmail) {
                                friends.push(friend);
                            }
                            return friends;
                        })
                        return userFriends;
                    })
                    this.setState({ friendsList: friends });
                })
            })
        }
    };

    sendMessage() {
        this.appendMessage("You: " + this.refs.messageInput.value);
        this.state.socket.emit('send-chat-message', this.refs.messageInput.value);
        this.refs.messageInput.value = "";
    };

    appendMessage(message) {
        let messageElement = document.createElement('div');
        let messageContainer = document.getElementById('chatWindow');

        messageElement.innerText = message;
        if (messageContainer) {
            messageContainer.append(messageElement);
        }

        // messageContainer.append(<MessageItem userMessage={message}></MessageItem>);
    }

    render() {

        if (this.state.logoutUser) {
            return <Redirect to='/' />;
        }

        if (localStorage.length === 0 || !localStorage.getItem("token")) {
            this.state.socket.close();
            console.log("not logged in/no accessToken, close and redirect to login");
            return <Redirect to='/login' />;
        }

        return (
            <div className="App-container">
                <div className="friendsList" style={{ backgroundColor: "#2F3136", width: "20%", height: "100vh", overflow: "auto" }}>
                    <div style={{ display: "flex", flexDirection: "column", width: "70%", alignItems: "center" }}>
                        <button style={{ margin: 2 }} id="logout" onClick={() => this.logout()}>Logout</button>
                        <button style={{ margin: 2 }} id="addFriend" onClick={() => this.sendFriendRequest()}>sendFriendRequest</button>
                        <input style={{ width: "70%", fontSize: "80%", color: "white", paddingLeft: 10, backgroundColor: "#40444B", border: "0px", margin: 2 }} placeholder="enter friends email" id="friendEmail" type="text" ref="friendEmail" />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", width: "70%", paddingLeft: 10 }}>
                        <p>Friends Requests</p>
                        <div id="friendRequestContainer">
                            {this.state.friendRequests.map((friendRequest, index) =>
                                <div style={{ fontSize: 10, border: "1px solid white", padding: 5, margin: 5 }} key={index}>
                                    <p>{friendRequest.status}</p>
                                    <p>{friendRequest.sender}</p>
                                    <p>{friendRequest.receiver}</p>
                                    <p>{friendRequest.date_request_sent}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <UserList
                        view={(res) => this.changeListState(res)}
                        users={this.state.friendsList}
                        listTitle="My Friends List">
                    </UserList>
                </div>
                <div className="chatWindow" style={{ backgroundColor: "#36393F", width: "80%", height: "100vh" }}>
                    <p>{this.state.userFirstName}, you are logged in</p>
                    <p>Chat Window</p>
                    <button style={{ width: "30%" }} id="changeView" onClick={() => this.changeView()}>change view</button>
                    {this.state.view ?
                        <div>
                            <div id="chatWindow" style={{ display: "flex", flexDirection: "column", backgroundColor: "#36393F", width: "80%", height: "80%", overflow: "auto", position: "absolute" }}>
                                <MessageItem userMessage={this.state.response}></MessageItem>
                            </div>

                        </div>
                        :
                        <LoginPage></LoginPage>
                    }
                    <div style={{ display: "flex", backgroundColor: "#40444B", position: "absolute", bottom: 25, width: "70%", height: 50, }}>
                        <input style={{ width: "70%", fontSize: "80%", color: "white", paddingLeft: 10, backgroundColor: "#40444B", border: "0px" }} id="messageInput" type="text" ref="messageInput" />
                        <button style={{ width: "30%" }} id="send-button" onClick={() => this.sendMessage()}>Send</button>
                    </div>
                </div>
            </div >
        );
    }
}