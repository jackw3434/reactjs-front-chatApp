import React from 'react';
import './App.css';
import UserList from './components/UserList';
import MessegeItem from './components/MessegeItem';
import { getUsers } from './functions/userFunctions/userFunctions';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    getUsers().then(response => {
      this.setState({ users: response });
    })
  };

  changeListState(response) {
    this.setState({ users: response });
  };

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
          <div className="chatWindow" style={{ backgroundColor: "blue", width: "80%", height: "80%", overflow: "auto", position: "absolute" }}>

            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
            <MessegeItem></MessegeItem>
          </div>
          <div style={{ backgroundColor: "yellow", position: "absolute", bottom: 5, width: "70%", height: 50, }}>
            <input type="text"></input>
          </div>
        </div>
      </div>

    );
  }
}