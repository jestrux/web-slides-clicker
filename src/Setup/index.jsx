import React, { Component } from 'react';
import Picker from "./picker";
import ScanQr from "./scanqr";

import './setup.css';

class Setup extends Component {
    state = {
        tab: 0
    }
    render() {
        return (
            <div id="setupScreen">
                <div className="actions">
                    {
                        this.state.tab === 0 &&
                        (
                            <Picker/>
                        )
                    }
                    {
                        this.state.tab === 1 &&
                        (
                            <ScanQr onSetUri={ (uri) => this.props.onSetUri(uri) } />
                        )
                    }
                </div> 
                <div className="tabs">
                    <button className={this.state.tab === 0 ? 'active' : ''} onClick={ () => this.setState({tab: 0})}>
                        DURATION
                    </button>
                    <span></span>
                    <button className={this.state.tab === 1 ? 'active' : ''} onClick={ () => this.setState({tab: 1})}>
                        CONNECT
                    </button>
                </div>
            </div>
        );
    }
}

export default Setup;
