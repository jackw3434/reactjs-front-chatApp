import React from 'react';
import { Link } from "react-router-dom";

export default class RootPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
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
                <h1 style={{ color: "white", textDecoration: "underline" }}>Welcome To Chappie</h1>
                <h2 style={{ color: "white", textDecoration: "underline"  }}>A Chatting Application</h2>
                <Link to="/login"><h3 style={{ color: "white" }}>login</h3></Link>
                <Link to="/register"><h3 style={{ color: "white" }}>Register</h3></Link>
            </div>
        )
    }
}