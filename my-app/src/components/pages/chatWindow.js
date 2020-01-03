import React from 'react';
import MessageItem from '../../components/MessageItem';

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
                    <MessageItem userMessage={this.state.response}></MessageItem>
                </div>
            </div>
        )
    }
}