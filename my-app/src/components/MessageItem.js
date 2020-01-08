import React from 'react';

export default class MessageItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            message: "",
            time: "",
            friendshipID: ""
        };
    }

    // componentDidUpdate() {
    //     console.log(this.props.userMessage);
    //     this.setState({
    //         name: this.props.userMessage.friend.first_name,
    //         message: this.props.userMessage.messageLog
    //     })
    // }

    render() {

        return (
            <div style={{ backgroundColor: "#36393F", width: "80%", margin: 10 }}>
                <p>Avatar</p>

                {/* <p>{this.props.userMessage.messageLog}</p> */}
            </div>
        )
    }
}