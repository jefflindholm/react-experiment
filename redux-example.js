import React from 'react';
import Redux from 'redux';

const counter = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
  }
  return state;
};

const { createStore } = Redux;

const store = createStore(counter);

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({type: 'INCREMENT'});
});

export default class Couter extends React.Component {
    onIncrement = () => {
        store.dispatch({type: 'IN'})
    };
    onDecrement = () => {

    };
    render() {
        return (
            <h1>{this.props.value}</h1>
            <button onClick={this.onIncrement}>+</button>
            <button onClick={this.onDecrement}>-</button>
        );
    }
}
