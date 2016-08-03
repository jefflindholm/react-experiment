import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import Devtools from 'mobx-react-devtools';

const appState = observable({
    count: 0,
});
appState.increment = function increment() {
    this.count++;
};
appState.decrement = function decrement() {
    this.count--;
};

@observer class Counter extends Component {
    render() {
        return (
            <div>
                Counter: {this.props.store.count} <br/>
                <button onClick={this.handleInc}> + </button>
                <button onClick={this.handleDec}> - </button>
            </div>
        );
    }

    handleInc = () => {
        this.props.store.increment();
    }

    handleDec = () => {
        this.props.store.decrement();
    }
}

export default class Wrapper extends Component {
    render() {
        return (
            <div>
                <div>
                    <Devtools />
                    <br/>
                </div>
                <Counter store={appState} />
            </div>
        );
    }
}
