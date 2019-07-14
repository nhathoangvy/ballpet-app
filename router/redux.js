import React from 'react'
import Home from './Home.js'
 
 const counter = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      return state;
     }
    }

class Redux extends React.Component {
    
   constructor() {
      super();
      this.state = {
          value: 0
      }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
   }

  provid(action) {
    this.setState(prevState => counter(prevState, action));
  }

  increment() {
    this.provid({ type: 'INCREMENT' });
  }

  decrement() {
    this.provid({ type: 'DECREMENT' });
  }

  render() {
    return (
      <div>
              {this.props.children || <Home/>}
        {this.state.value}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    )
  }
}

export default Redux