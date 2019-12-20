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
            <div style={{ backgroundColor: "#36393F", width: "80%", margin: 10 }}>
                <h1>root</h1>
                <Link to="/main"><p>go to main</p></Link>
                <Link to="/login"><p>go to login</p></Link>
            </div>
        )
    }
}