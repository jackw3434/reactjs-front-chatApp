import React from 'react';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    openThisFriendsChatWindow(user) {
        //console.log(user);
        this.props.view(user);
    }

    mouseOver(divID) {
        let friendElement = document.getElementById(divID);
        friendElement.style.backgroundColor = "#595d66"   
    }

    mouseLeave(divID) {
        let friendElement = document.getElementById(divID);
        friendElement.style.backgroundColor = "#2F3136"
    }

    render() {
        return (
            <div>
                {this.props.users ?
                    <div style={{ paddingLeft: 10 }}>
                        <p>{this.props.listTitle}</p>
                        {this.props.users.map((user, index) =>
                            <div id={user.friend.email}
                                ref="friend"
                                onMouseOver={() => this.mouseOver(user.friend.email)}
                                onMouseLeave={() => this.mouseLeave(user.friend.email)}
                                style={{ paddingLeft: 10 }}
                                onClick={() => this.openThisFriendsChatWindow(user)}
                                key={index} >
                                <p style={{cursor: "pointer"}}>{user.friend.first_name + " " + user.friend.surname}</p>
                            </div>
                        )}
                    </div>
                    :
                    <p>Users Not Found</p>
                }
            </div>
        )
    }
}