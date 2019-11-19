import React from 'react';
import './App.css';
import UserList from './components/UserList';
import BaseService from './functions/BaseService.js';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };

  }

  componentDidMount() {
    BaseService.getUsers().then(response => {
      this.setState({ users: response.data.users });
      console.log("done ", response);
    })
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <UserList
            users={this.state.users}
            listTitle="My User List">
          </UserList>
        </header>
      </div>
    );
  }
}