import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import mobxReact from 'mobx-react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';


const appState = observable({
  count : 0
})
appState.increment = function() {
  this.count++;
}
appState.decrement = function() {
  this.count--;
}

@observer class Counter extends Component {
  render() {
    return (
      <div>
        Counter: {this.props.store.count} <br/>
        <button onClick={this.handleInc}> + </button>
        <button onClick={this.handleDec}> - </button>
      </div>
    )
  }

  handleInc = () => {
    this.props.store.increment()
  }

  handleDec = () => {
    this.props.store.decrement()
  }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <Counter store={appState}/>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
