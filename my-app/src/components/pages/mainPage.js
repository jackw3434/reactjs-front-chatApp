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
            appendMessage: "",
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
                if (foundFriendRequests) {
                    foundFriendRequests.map(request => {
                        if (request.sender == userEmail) {
                            request.sender = "You have sent a friend request to: " + request.receiver;
                        } else {
                            request.sender = "New friend request from: " + request.sender;
                        }
                    });
                }
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
        let friends = [];
        let userEmail = localStorage.getItem("email");

        if (friendEmail === "") {
            console.log("Missing for field");
        } else {
            sendFriendRequest(friendEmail).then(response => {
                getMyFriendRequests().then(foundFriendRequests => {
                    foundFriendRequests.map(request => {
                        if (request.sender == userEmail) {
                            request.sender = "You have sent a friend request to: " + request.receiver;
                        } else {
                            request.sender = "New friend request from: " + request.sender;
                        }
                    });
                    this.setState({ friendRequests: foundFriendRequests });
                })
                getMyFriendsList().then(foundfriendsList => {

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

    changeFriendWindow(friend) {
        //console.log("friend ", friend);
        this.setState({ currentChattingFriend: friend });
    };

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
            <div className="App-container" style={{ height: "100vh" }}>
                <div className="friendsList" style={{ backgroundColor: "#2F3136", width: "20%", height: "100%", overflow: "auto" }}>

                    {/* logout send friend request */}
                    <div style={{ display: "flex", flexDirection: "column", width: "70%", alignItems: "center", marginLeft: 20 }}>
                        <button style={{ margin: 2, marginTop: 20 }} id="logout" onClick={() => this.logout()}>Logout</button>
                        <button style={{ margin: 2, marginTop: 10, marginBottom: 10 }} id="addFriend" onClick={() => this.sendFriendRequest()}>sendFriendRequest</button>
                        <input style={{ marginLeft: 10, width: "100%", height: 40, fontSize: "70%", color: "white", paddingLeft: 10, backgroundColor: "#40444B", border: "0px", margin: 2 }} placeholder="enter friends email" id="friendEmail" type="text" ref="friendEmail" />
                    </div>

                    {/* Display friend Requests */}
                    <div style={{ display: "flex", flexDirection: "column", width: "70%", paddingLeft: 10 }}>
                        <p>Friends Requests</p>
                        <div id="friendRequestContainer">
                            {this.state.friendRequests.map((friendRequest, index) =>
                                <div style={{ fontSize: 16, border: "1px solid white", padding: 5, margin: 5, wordBreak: "break-word" }} key={index}>
                                    <p style={{}}>{friendRequest.sender}</p>
                                    <p>Status: <b>{friendRequest.status}</b></p>
                                    {/* <p>{friendRequest.receiver}</p> */}
                                    {/* <p>{friendRequest.date_request_sent}</p> */}
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

                    <ChatWindow
                        friendInstance={this.state.currentChattingFriend}
                        appendMessage={this.state.appendMessage}
                        loggedInUserName={this.state.userFirstName}
                        loggedInUserEmail={this.state.userEmail}>
                    </ChatWindow>
                </div>
            </div >
        );
    }
}
