import React from 'react';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    openThisFriendsChatWindow() {

    }

    mouseOver() {

    }

    render() {
        return (
            <div>
                {this.props.users ?
                    <div style={{ paddingLeft: 10 }}>
                        <p>{this.props.listTitle}</p>
                        {this.props.users.map((user, index) =>
                            <div id={user._id} onMouseOver={() => this.mouseOver()} style={{ paddingLeft: 10 }} onClick={() => this.openThisFriendsChatWindow()} key={index} >
                                <p>{user.first_name + " " + user.surname}</p>
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