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
            userData: "",
            goBack: false
        };
    }

    componentDidMount() {
        localStorage.clear();
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
                    if (response && response.data.successMessage === "User Logged In" && response.data.accessToken) {

                        localStorage.setItem("user_id", response.data.userData._id);
                        localStorage.setItem("first_name", response.data.userData.first_name);
                        localStorage.setItem("surname", response.data.userData.surname);
                        localStorage.setItem("email", response.data.userData.email);
                        localStorage.setItem("token", response.data.accessToken);

                        this.setState({ redirect: true });
                        console.log("Logging in, redirecting ");
                    } else {
                        console.log("failed login response : ", response);
                        return;
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

    goBack() {
        this.setState({ goBack: true })
    };

    render() {
        const { redirect, goBack } = this.state;
        if (redirect) {
            return <Redirect from='/login' to={{ pathname: '/main' }} />;
        }

        if (goBack) {
            return <Redirect to='/' />;
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
                    <input placeholder="Password" type="password" ref="password" onChange={(password) => this.setPassword(password)} /><br />

                    <div style={{ display: "flex" }}>
                        <button style={{ margin: 5, }} onClick={() => this.goBack()}>cancel</button>
                        <button style={{ margin: 5 }} onClick={() => this.loginButton()}>Login</button>
                    </div>
                </div>
            </div>
        )
    }
}