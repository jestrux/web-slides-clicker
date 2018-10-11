import React from 'react';
import PropTypes from 'prop-types';
import { Event } from 'react-socket-io';

import CurrentSlide from './CurrentSlide';
import SlideStack from './SlideStack';

class App extends React.Component {
  static contextTypes = {
    socket: PropTypes.object.isRequired
  }

  state = {
    currentSlide: 0,
    slides: []
  }

  onSetup = (data) => {
    console.log("Setup data:", data);
    this.setState({slides: data.slides_preview});
  }

  onAction = (action) => {
    this.context.socket.emit('SLIDESHOW_ACTION', action);
  }
  
  onOpenSlide = (index) => {
    this.setState({ currentSlide: index });
    this.onAction({type: 'go', data: { slide: index + 1 }});
  }

  render() {
    return (
      <div id="mainApp">
        <div id="slideIndex">
          { this.state.currentSlide + 1}
        </div>
        <Event event='setup' handler={this.onSetup} />
        <CurrentSlide slide={this.state.slides[this.state.currentSlide]}/>
        <SlideStack slides={this.state.slides} 
          onAction={this.onAction}
          onOpenSlide={ this.onOpenSlide } />
      </div>
    );
  }
}

export default App;
