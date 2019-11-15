import React from 'react';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }  

    render() {
        return (
            <div>
                <p>{this.props.listTitle}</p>
                <ul>
                    {this.props.users.map((user, index) =>
                        <li key={index}>
                            <a title={"ID: " + user._id + '/n' + "Name: " + user.name}>{user.name}</a>
                        </li>
                    )}
                </ul>
                <button onClick={this.props.postUserOnClick}>Click Me</button>
            </div>
        )
    }
}