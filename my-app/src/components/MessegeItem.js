import React from 'react';

export default class MessageItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <div style={{ backgroundColor: "#36393F", width: "80%", margin: 10 }}>
                <p>Avatar</p>
                <p>{this.props.userMessage}</p>
            </div>
        )
    }
}