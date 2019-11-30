import React from 'react';
import './App.css';
import UserList from './components/UserList';
import MessegeItem from './components/MessegeItem';
import { getUsers } from './functions/userFunctions/userFunctions';
import socketIOClient from 'socket.io-client';
const socket = socketIOClient("http://localhost:7000");
export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      message: "",
      response:""
    };
    
  }

  componentDidMount() {
    getUsers().then(response => {
      this.setState({ users: response });
    })
  };

  componentWillUpdate(){

    socket.on("chat-message", data => {
      console.log(data);
      this.appendMessage(data);
    });
  };

  changeListState(response) {
    this.setState({ users: response });
  };

  sendMessege() {
    socket.emit('send-chat-message', this.refs.messageInput.value);
    this.refs.messageInput.value = "";
  }
 
  appendMessage(message){
    let messageElement = document.createElement('div');
    let messageContainer = document.getElementById('chatWindow');

    messageElement.innerText = message;
    messageContainer.append(messageElement);
  }

  render() {


    return (
      <div className="App-container">
        <div className="friendsList" style={{ backgroundColor: "green", width: "20%" }}>
          <p>Friends List</p>
          <UserList
            view={(res) => this.changeListState(res)}
            users={this.state.users}
            listTitle="My User List">
          </UserList>
        </div>
        <div className="chatWindow" style={{ backgroundColor: "orange", width: "80%", height: "100vh" }}>
          <p>Chat Window</p>
          <div id="chatWindow"className="chatWindow" style={{ backgroundColor: "blue", width: "80%", height: "80%", overflow: "auto", position: "absolute" }}>
            <MessegeItem userMessage={this.state.response}></MessegeItem>
          </div>
          <div style={{ backgroundColor: "yellow", position: "absolute", bottom: 5, width: "70%", height: 50, }}>
            <input id="messageInput" type="text" ref="messageInput" />
            <button id="send-button" onClick={() => this.sendMessege()}>Send</button>
          </div>
        </div>
      </div>

    );
  }
}