import React from 'react';
import MessegeItem from '../../components/MessegeItem';

export default class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <p>Chat Window</p>
                <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#36393F", width: "80%", height: "80%", overflow: "auto", position: "absolute" }}>
                    <MessegeItem userMessage={this.state.response}></MessegeItem>
                </div>
            </div>
        )
    }
}