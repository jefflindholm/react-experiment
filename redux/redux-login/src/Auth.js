import React from 'react';

export default class Auth extends React.Component {
    handleLogin = () => {

    };
    handleLogout = () => {

    };
    render() {
        return (
            <div>
                <input type="text" ref="username" />
                <input type="button" value="Login" onClick={this.handeLogin} />
                <h1>Current state is...</h1>
            </div>
        );
    }
}