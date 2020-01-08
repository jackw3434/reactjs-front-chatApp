import React from 'react';
import '../../App.css';
import FriendList from '../UserList';
import MessageItem from '../MessageItem';
import ChatWindow from '../chatWindow';
import { sendFriendRequest, getMyFriendRequests, getMyFriendsList } from '../axiosFunctions/friendRequestFunctions';
import socketIOClient from 'socket.io-client';
import { Redirect } from "react-router-dom";

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logoutUser: false,
            view: true,
            socket: socketIOClient("http://localhost:7000"),
            userFirstName: localStorage.getItem("first_name"),
            userSurname: localStorage.getItem("surname"),
            userEmail: localStorage.getItem("email"),
            friendRequests: [],
            friendsList: [],
            currentChattingFriend: [],
            appendMessage: ""
        };
    }

    componentDidMount() {

        if (localStorage.length === 0) {
            console.log("redirecting, localStorage.length===0");
            return <Redirect to='/login' />;
        } else {

            let friends = [];
            let userEmail = localStorage.getItem("email");

            getMyFriendRequests().then(foundFriendRequests => {
                // console.log("foundFriendRequests ", foundFriendRequests);
                getMyFriendsList().then(foundfriendsList => {
                    // console.log("foundfriendsList ", foundfriendsList);

                    if (foundfriendsList) {
                        foundfriendsList.map((userFriends) => {
                            userFriends.friendObjects.map(friend => {
                                if (friend.email !== userEmail) {
                                    friends.push({
                                        friend,
                                        messageLog: userFriends.messageLog,
                                        friendshipID: userFriends._id
                                    });
                                }
                                return friends;
                            })
                            return userFriends;
                        })

                        this.setState({
                            friendsList: friends,
                            friendRequests: foundFriendRequests
                        });
                    }
                })
            })
        }
    };

    componentDidUpdate() {

       let { socket } = this.state;

        // socket.on("chat-message", data => {
        //     this.appendMessage(data.name + ": " + data.message);
        // });

        // if (this.state.view && this.state.userFirstName) {
        //     this.appendMessage("You Joined");
           //  socket.emit("new-user", "main page");
        // }

        // socket.on("user-connected", name => {
        //     this.appendMessage(name + " connected");
        // });

        // socket.on("user-disconnected", name => {
        //     this.appendMessage(name + " disconnected");
        // });
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
                    // return;
                })
                getMyFriendsList().then(foundfriendsList => {
                    console.log("Accepted, getting LIST! ", foundfriendsList);

                    let friends = [];
                    let userEmail = localStorage.getItem("email");

                    foundfriendsList.map((userFriends) => {
                        userFriends.friendObjects.map(friend => {
                            if (friend.email !== userEmail) {
                                friends.push({
                                    friend,
                                    messageLog: userFriends.messageLog,
                                    friendshipID: userFriends._id
                                });
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

    // sendMessage() {
    //     this.appendMessage("You: " + this.refs.messageInput.value);
    //     this.state.socket.emit('send-chat-message', this.refs.messageInput.value);
    //     this.refs.messageInput.value = "";
    // };

    // appendMessage(message) {
    //    // console.log(message);
    //     let messageElement = document.createElement('div');
    //     let messageContainer = document.getElementById('chatWindow');

    //     messageElement.innerText = message;
    //     if (messageContainer) {
    //         messageContainer.append(messageElement);
    //     }
    // }

    changeFriendWindow(friend) {
        console.log("friend ", friend);
        this.setState({ currentChattingFriend: friend });
    };

    render() {
        // console.log("current chatting friend ",this.state.currentChattingFriend);

        if (this.state.logoutUser) {
            return <Redirect to='/' />;
        }

        if (localStorage.length === 0 || !localStorage.getItem("token")) {
            this.state.socket.close();
            console.log("not logged in/no accessToken, close and redirect to login");
            return <Redirect to='/login' />;
        }

        return (
            <div className="App-container" style={{ height: "100vh" }}>
                <div className="friendsList" style={{ backgroundColor: "#2F3136", width: "20%", height: "100%", overflow: "auto" }}>

                    {/* logout send friend request */}
                    <div style={{ display: "flex", flexDirection: "column", width: "70%", alignItems: "center" }}>
                        <button style={{ margin: 2 }} id="logout" onClick={() => this.logout()}>Logout</button>
                        <button style={{ margin: 2 }} id="addFriend" onClick={() => this.sendFriendRequest()}>sendFriendRequest</button>
                        <input style={{ width: "70%", fontSize: "80%", color: "white", paddingLeft: 10, backgroundColor: "#40444B", border: "0px", margin: 2 }} placeholder="enter friends email" id="friendEmail" type="text" ref="friendEmail" />
                    </div>

                    {/* Display friend Requests */}
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

                    {/* Display Friend List */}
                    <FriendList
                        view={(friend) => this.changeFriendWindow(friend)}
                        users={this.state.friendsList}
                        listTitle="My Friends List">
                    </FriendList>
                </div>

                {/* Chat Window that changes between users or show default when not selected */}

                <div id="chatWindowContainer" style={{ backgroundColor: "#36393F", width: "80%", height: "100%" }}>
                    <div id="header" style={{ paddingLeft: 20 }}>
                        <p>{this.state.userFirstName}, you are logged in</p>
                    </div>
                    {/* send currentChattingFriend to the component */}

                    <ChatWindow friendInstance={this.state.currentChattingFriend} appendMessage={this.state.appendMessage} loggedInUserName={this.state.userFirstName}></ChatWindow>

                </div>
            </div >
        );
    }
}