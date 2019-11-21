import React from 'react';
import './App.css';
import UserList from './components/UserList';
import { getUsers } from './functions/userFunctions/userFunctions'

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
      <div className="App">
        <header className="App-header">
          <UserList
            view={(res) => this.changeListState(res)}
            users={this.state.users}
            listTitle="My User List">
          </UserList>
        </header>
      </div>
    );
  }
}