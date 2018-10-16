import React from 'react';
import PropTypes from 'prop-types';
import { Event } from 'react-socket-io';

import SlideStack from './SlideStack';

// import slides from './slides'

class App extends React.Component {
  static contextTypes = {
    socket: PropTypes.object.isRequired
  }

  state = {
    currentSlide: 0,
    slides: [],
    time: 120,
    timetStarted: false
  }

  startTimer = () => {
    this.setState({timetStarted: true});
    setInterval(() => {
      this.setState({time: this.state.time - 1});
    }, 1000 * 60);
  }

  onSetup = (data) => {
    // alert("Setup data:", JSON.stringify(data));
    this.setState({slides: data.slides_preview});
    console.log("Setup: ", JSON.stringify(data.slides_preview));
  }

  onAction = (action) => {
    this.context.socket.emit('SLIDESHOW_ACTION', action);
    console.log(action.type);
    this.setState({ currentSlide: this.state.currentSlide + (action.type === 'next' ? 1 : -1) });
    
    if(!this.state.timetStarted){
      this.startTimer();
    }
  }
  
  onSlideAction = (action) => {
    this.context.socket.emit('SLIDE_ACTION', action);
    console.log(action.type);
    
    if(!this.state.timetStarted){
      this.startTimer();
    }
  }
  
  onOpenSlide = (index) => {
    this.setState({ currentSlide: index });
    this.onAction({type: 'go', data: { slide: index + 1 }});
  }

  render() {
    const { slides } = this.state;
    return (
      <div id="mainApp">
        <div id="slideIndex">
          { this.state.currentSlide + 1}
        </div>
        <div id="slideshowTime">
          <span>{ parseInt(this.state.time / 60).toString().padStart(2, '0')}</span>
          <span className="blink">:</span>
          <span>{ (this.state.time % 60).toString().padStart(2, '0')}</span>
        </div>
        <Event event='setup' handler={this.onSetup} />
        { slides && slides.length > 0 && <SlideStack 
          cur={this.state.slides[this.state.currentSlide]}
          prev={this.state.slides[this.state.currentSlide - 1]}
          next={this.state.slides[this.state.currentSlide + 1]}
          // cur={{name: 'Prev Slide'}}
          // prev={{name: 'Currenr Slide'}}
          // next={{name: 'Next Slide'}}
          onAction={this.onAction}
          onSlideAction={this.onSlideAction}
          onOpenSlide={ this.onOpenSlide } />
        }
      </div>
    );
  }
}

export default App;
