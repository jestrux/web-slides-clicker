import React from 'react';
import PropTypes from 'prop-types';
import { Event } from 'react-socket-io';

import Controls from './Controls';

class App extends React.Component {
  static contextTypes = {
    socket: PropTypes.object.isRequired
  }

  onSetup = (data) => {
    console.log("Setup data:", data);
  }

  onAction = (action) => {
    this.context.socket.emit('SLIDESHOW_ACTION', action);
  }

  render() {
    return (
      <React.Fragment>
        <Event event='setup' handler={this.onSetup} />
        <Controls onAction={this.onAction} />
      </React.Fragment>
    );
  }
}

export default App;
