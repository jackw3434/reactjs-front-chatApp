import React from 'react';
import { registerUser } from '../axiosFunctions/userFunctions'
import { Redirect } from "react-router-dom";

export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            redirect: false
        };
    }

    registerUserButton() {

        let { name, email, password } = this.state;

        if (!name || !email || !password) {
            console.log("Missing Form Fields");
        } else {

            let newUser = {
                "name": name,
                "email": email,
                "password": password
            };

            registerUser(newUser)
                .then(response => {
                    this.setState({ redirect: true });
                })

            this.refs.name.value = "";
            this.refs.email.value = "";
            this.refs.password.value = "";
            this.setState({ name: "", email: "", password: "" });
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
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/login' />;
        }
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#36393F",
                width: "100%",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <h1 style={{ color: "white", position: "absolute", top: "20%" }}>Register</h1>
                <div style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <input placeholder="Name" type="text" ref="name" onChange={(name) => this.setName(name)} /><br />
                    <input placeholder="Email" type="text" ref="email" onChange={(email) => this.setEmail(email)} /><br />
                    <input placeholder="Password" type="text" ref="password" onChange={(password) => this.setPassword(password)} /><br />

                    <button onClick={() => this.registerUserButton()}>Register New user</button>
                </div>
            </div>
        )
    }
}