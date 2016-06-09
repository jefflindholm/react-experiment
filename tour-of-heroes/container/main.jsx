import React from 'react';
import { Link } from 'react-router';
import './main.css';

export default class Main extends React.Component {
    title = 'Tour of Heroes';
    render() {
        return (
            <div>
                <h1>{this.title}</h1>
                <nav>
                    <Link to="/Dashboard">Dashboard</Link>
                    <Link to="/Heroes">Heroes</Link>
                </nav>
                {this.props.children}
            </div>
        )
    }
}

Main.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
