import React from 'react';

class Hello extends React.Component {
    render() {
        return <span>Hello</span>;
    }
}
class World extends React.Component {
    static propTypes = {
        name: React.PropTypes.string
    }
    render() {
        return <span>{this.props.name || 'World'}!</span>;
    }
}
export default class Main extends React.Component {
    render() {
        return (
            <div><Hello/> <World name="Jeff"/></div>
        )
    }
}
