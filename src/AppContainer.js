import React from 'react';
import { Socket } from 'react-socket-io';
import Setup from './Setup';
import App from './App';

// const uri = 'http://192.168.8.101:5000';
const options = { transports: ['websocket'] };

class AppContainer extends React.Component {
  state = {
    uri: null,
    started: false
  };

  getStarted = () => {
    this.setState({ started: true });
    this.openFullscreen(document.getElementById("root"))
    window.screen.orientation.lock("portrait-primary");
  }
  
  setUri = (uri) => {
    this.setState({ uri: uri});
  }

  openFullscreen = (elem) => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
    else{
      console.log("Not elligible for full screen");
    }
  }
  
  render() {
    return (
      <React.Fragment>
        {
          this.state.started && (
            <React.Fragment>
              {
                this.state.uri!= null && (
                  <Socket uri={this.state.uri} options={options}> 
                    <App />
                  </Socket>
                )
              }
              {  
                this.state.uri === null && <Setup onSetUri={ (uri) => this.setUri(uri) }/>
              }
            </React.Fragment>
          )
        }

        {
          !this.state.started && (
            <button id="startBtn" onClick={ this.getStarted }>GET STARTED</button>
          )
        }
      </React.Fragment>
    );
  }
}

export default AppContainer;
