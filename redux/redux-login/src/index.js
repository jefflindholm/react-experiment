import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

//import App from './App';
import './index.css';

function auth(state = { status: 'logged out', username: 'guest' }, action) {
    console.log('auth', action);
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                status: 'logged in',
                username: action.username,
            });
        case 'LOGOUT':
            return Object.assign({}, state, {
                status: 'logged out',
                username: 'guest',
            });
        default:
            return state;
    }
}

const store = createStore(auth);

class Auth extends React.Component {
    handleLogin = () => {
        const username = this.refs.username.value;
        store.dispatch({
            type: 'LOGIN',
            username,
        });
        console.log('login');
    };
    handleLogout = () => {
        store.dispatch({
            type: 'LOGOUT',
        });
        this.refs.username.value = '';
    };
    render() {
        let button;
        if (this.props.state.status === 'logged in') {
            button = <button onClick={this.handleLogout}>Log out</button>;
        } else {
            button = <button onClick={this.handleLogin}>Login</button>;
        }
        return (
            <div>
                <input type="text" ref="username" />
                {button}
                <h1>Current state is {`${this.props.state.status} as ${this.props.state.username}`}</h1>
            </div>
        );
    }
}

function render() {
    ReactDOM.render(
        <Auth state={store.getState()}/>,
        document.getElementById('root')
    );
}
store.subscribe(render);
render();
