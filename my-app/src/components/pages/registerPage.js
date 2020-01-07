import React from 'react';
import { registerUser } from '../axiosFunctions/userFunctions'
import { Redirect } from "react-router-dom";

export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            surname: "",
            email: "",
            password: "",
            redirect: false
        };
    }

    registerUserButton() {

        let { first_name, surname, email, password } = this.state;

        if (!first_name || !surname || !email || !password) {
            console.log("Missing Form Fields");
        } else {

            let newUser = {
                "first_name": first_name,
                "surname": surname,
                "email": email,
                "password": password
            };

            registerUser(newUser)
                .then(response => {

                    if (response === "Error: Request failed with status code 409") {
                        console.log("User with that email already exists");
                        return;
                    }

                    if (response === "UnauthorizedError: jwt expired, clearing cache and retrying") {
                        console.log("UnauthorizedError: jwt expired, clearing cache and retrying");
                        return;
                    }

                    if (response === "Error: Network Error") {
                        console.log("Error: Network Error, server not running");
                        return;
                    }

                    if (response === undefined) {
                        console.log("Generic_error: Network/JWT Issue");
                        return;
                    } else {
                        if (response === "User: "+ email + " has been created.") {
                            console.log("true, redirecting", response)
                            this.setState({ redirect: true });
                            return;
                        }
                    }
                })

            this.refs.firstName.value = "";
            this.refs.surname.value = "";
            this.refs.email.value = "";
            this.refs.password.value = "";
            this.setState({ first_name: "", surname: "", email: "", password: "" });
        }
    }

    setFirstName(firstName) {
        this.setState({ first_name: firstName.target.value })
    };

    setSurname(surname) {
        this.setState({ surname: surname.target.value })
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
                    <input placeholder="firstName" type="text" ref="firstName" onChange={(firstName) => this.setFirstName(firstName)} /><br />
                    <input placeholder="surname" type="text" ref="surname" onChange={(surname) => this.setSurname(surname)} /><br />
                    <input placeholder="Email" type="text" ref="email" onChange={(email) => this.setEmail(email)} /><br />
                    <input placeholder="Password" type="text" ref="password" onChange={(password) => this.setPassword(password)} /><br />

                    <button onClick={() => this.registerUserButton()}>Register New user</button>
                </div>
            </div>
        )
    }
}