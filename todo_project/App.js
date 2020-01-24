import React, { Component } from 'react';
import './style.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem:"", 
      list: []
    }
  }

  updateInput(key, value) {
    this.setState({
      [key]: value
    });
  }

  addItem() {
    const newItem =  {
      id: 1 + Math.random(), 
      value: this.state.newItem.slice()
    };
    const list = [...this.state.list];
    list.push(newItem);
    this.setState({
      list, 
      newItem:""
    });
  }

  deleteItem(id) {
    const list = [...this.state.list];
    const updatedList = list.filter(item => item.id !== id);
    this.setState({list: updatedList});
  }

  render() {
    return (
      
      <div className = "App">
        <div class = "body">
          <p id = "title">
            Life Plan
          </p>
          <input
            id = "typeBox"
            type = "text"
            placeholder = "Enter an item"
            value={this.state.newItem}
            onChange={e => this.updateInput("newItem", e.target.value)}
          />
          <button 
            id = "addButton"
            onClick ={() => this.addItem()}
            // onKeyUp ={() => {if(this.key === 'Enter')this.addItem()}}
          > Add </button>

          <KeyboardEventHandler
            handleKeys={['enter']}
            onKeyEvent={(key, handleKeys) => this.addItem()} 
          />
          
          <ul id = "list">
          {this.state.list.map(item => {
            return (
              <li key= {item.id}>
                {item.value}
                <button onClick = {() => { if (window.confirm('Are you sure you wish to delete ' + item.value +'?'))  this.deleteItem(item.id) }}> remove </button>
              </li>
            )
          })}
          </ul>
        </div>
      </div>
    );
  }
}


export default App;
