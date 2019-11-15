import React from 'react';
import './App.css';
import UserList from './components/UserList';
import axios from 'axios';
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
      .catch(function (error) {
        console.log("Error ", error);
      });
  };
  handleClick() {

    axios.post('http://localhost:8080/api/users', {
      "name": "Joe",
      "email": "Joe@gmail.com",
      "role": "superAdmin",
      "password": "test123"
    })
      .then(response => {
        //this.setState({ users: response.data.users });
        console.log("response ", response);
      })
      .catch(function (error) {
        console.log("Error ", error);
      });
    // this.props = "Hello";
    // console.log(this.props);
    // this.setState({ users: this.props });
    // console.log('state', this.state);
    // this.forceUpdate();
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <UserList
            users={this.state.users}
            postUserOnClick={() => this.handleClick()}
            listTitle="My User List">
          </UserList>
        </header>
      </div>
    );
  }
}