import React from 'react';
import { getUsers, editUserByID, postUser, deleteUser } from '../functions/userFunctions/userFunctions'

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: ""
        };
    }

    editUserButton() {

        let { name, email, password } = this.state;

        if (!name || !email || !password) {
            console.log("Missing Form Fields");
        } else {

            let editedUser = {
                "name": this.state.name,
                "email": this.state.email,
                "password": this.state.password
            };

            editUserByID(this.props.users[0].id, editedUser)
                .then(response => {
                    getUsers().then(response => {
                        this.props.view(response);
                    });
                })

            this.refs.name.value = "";
            this.refs.email.value = "";
            this.refs.password.value = "";
            this.setState({ name: "", email: "", password: "" });
        }
    }

    postUserButton() {

        let { name, email, password } = this.state;

        if (!name || !email || !password) {
            console.log("Missing Form Fields");
        } else {

            let newUser = {
                "name": this.state.name,
                "email": this.state.email,
                "password": this.state.password
            };

            postUser(newUser)
                .then(response => {
                    getUsers().then(response => {
                        this.props.view(response);
                    });
                })

            this.refs.name.value = "";
            this.refs.email.value = "";
            this.refs.password.value = "";
            this.setState({ name: "", email: "", password: "" });
        }
    }

    deleteUserButton() {
        if (this.props.users && this.props.users[0]) {
            deleteUser(this.props.users[0].id).then(response => {
                getUsers().then(response => {
                    this.props.view(response);
                });
            });
        } else {
            console.log("No Users in the List to delete");
        }
    }

    setName(name) {
        this.setState({ name: name.target.value })
    };

    setEmail(email) {
        this.setState({ email: email.target.value })
    };

    setPassword(password) {
        this.setState({ password: password.target.value })
    };

    render() {
        return (
            <div>
                {this.props.users &&
                    <div>
                        <p>{this.props.listTitle}</p>
                        <ul>
                            {this.props.users.map((user, index) =>
                                <li key={index}>
                                    <a title={"ID: " + user.id + " Name: " + user.name}>{user.name}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                }
                <div>

                    <input placeholder="Name" type="text" ref="name" onChange={(name) => this.setName(name)} /><br />
                    <input placeholder="Email" type="text" ref="email" onChange={(email) => this.setEmail(email)} /><br />
                    <input placeholder="Password" type="text" ref="password" onChange={(password) => this.setPassword(password)} /><br />

                    <button onClick={() => this.postUserButton()}>Post New user, Get and refresh</button>
                    <button onClick={() => this.deleteUserButton()}>Delete First user</button>
                    <button onClick={() => this.editUserButton()}>Edit First user</button>
                </div>
            </div>
        )
    }
}