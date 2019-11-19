import React from 'react';
import BaseService from '../functions/BaseService';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [          
            ],
            name: String,
            email: String,
            role: String,
            password: String
        };
    }

    componentDidUpdate() {
        console.log("props ", this.props);
        console.log("state ", this.state);
    };

    handleClick() {

        let newUser = {
            "name": this.state.name,
            "email": this.state.email,
            "role": this.state.role,
            "password": this.state.password
        };

        BaseService.postUser(newUser)
            .then(response => {
                console.log("response ", response);
                BaseService.getUsers().then(response => {
                    this.setState({ users: response.data.users });
                    console.log("done ", response);
                })
            })     
    }

   
    setEmail(email){
        this.setState({email: email})
        console.log(email.data);
    };

    render() {
        return (
            <div>
                <div>
                    <p>{this.props.listTitle}</p>
                    <ul>
                        {this.props.users.map((user, index) =>
                            <li key={index}>
                                <a title={"ID: " + user._id +  " Name: " + user.name}>{user.name}</a>
                            </li>
                        )}
                    </ul>
                </div>
                <div>
              
                    <input type="text"  onChange={(email) =>this.setEmail(email)} /><br/>
                    <input type="text" onChange={this.handleChange} />
                    {/* <input type="text" value={this.state.role} onChange={this.handleChange} />
                    <input type="text" value={this.state.password} onChange={this.handleChange} /> */}
                    <button onClick={() => this.handleClick()}>Post New user, Get and refresh</button>
                    {/* <button onClick={this.props.postUserOnClick}>Delete All</button> */}
                </div>
            </div>
        )
    }
}