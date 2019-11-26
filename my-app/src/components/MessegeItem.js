import React from 'react';

export default class MessageItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <div style={{ backgroundColor: "red", width: "80%", margin: 10 }}>
                <p>Avatar</p>
                <p>user message</p>
            </div>
        )
    }
}