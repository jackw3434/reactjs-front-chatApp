import React from 'react';
import { loginUser } from '../axiosFunctions/userFunctions'
import { Redirect } from "react-router-dom";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: false,
            userData: ""
        };
    }

    loginButton() {

        let { email, password } = this.state;

        if (!email || !password) {
            console.log("Missing Form Fields");
        } else {

            let user = {
                "email": email,
                "password": password
            };

            loginUser(user)
                .then(response => {
                    if (response.data.successMessage == "User Logged In" && response.data.accessToken) {
                        this.setState({ redirect: true, userData: response.data });
                        console.log("redirecting ");
                    } else {
                        console.log("failed login response : ", response);
                    }
                });

            this.refs.email.value = "";
            this.refs.password.value = "";
            this.setState({ email: "", password: "" });
        }
    }

    setEmail(email) {
        this.setState({ email: email.target.value })
    };

    setPassword(password) {
        this.setState({ password: password.target.value })
    };

    render() {
        const { redirect } = this.state;

        if (redirect) {
            let user = this.state.userData
            return <Redirect from='/login' to={{ pathname: '/main', state: { user } }} />;
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
                <h1 style={{ color: "white", position: "absolute", top: "20%" }}>Login</h1>
                <div style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <input placeholder="Email" type="text" ref="email" onChange={(email) => this.setEmail(email)} /><br />
                    <input placeholder="Password" type="text" ref="password" onChange={(password) => this.setPassword(password)} /><br />

                    <button onClick={() => this.loginButton()}>Login</button>
                </div>
            </div>
        )
    }
}