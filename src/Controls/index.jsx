import React, { Component } from 'react';
import './Controls.css';

class Controls extends Component { 
  render() {
    return (
      <div className="controls">
        <button onClick={ () => this.props.onAction({type: 'prev'})}>
          Prev
        </button>
        <button onClick={ () => this.props.onAction({type: 'next'})}>
          Next
        </button>
      </div>
    );
  }
}

export default Controls;
