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
                <h1 style={{ color: "white" }}>Welcome To Chapppie</h1>
                <Link to="/main"><p style={{ color: "white" }}>go to main</p></Link>
                <Link to="/login"><p style={{ color: "white" }}>login</p></Link>
                <Link to="/register"><p style={{ color: "white" }}>Register</p></Link>
            </div>
        )
    }
}