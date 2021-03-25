import React, { Component } from 'react'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.ws = new WebSocket(`ws://localhost:8080/`);
    this.appVideo = React.createRef();
    this.state = {
      msg: '',
      rx: ''
    };
  }

  componentDidMount(){
    this.initializetWS();
    const vdo = this.appVideo.current;
    vdo.addEventListener('loadedmetadata', this.getVideoMetadata)
  }

  initializetWS = () => {
    this.ws.onopen = (evt) => {
        console.log(`[open] WebSocket Client Connected ${evt}`);
        this.ws.send(`Hi from client.`);
    };

    this.ws.onmessage = (evt) => {
      console.log("[message] Received: '" + evt.data + "'");
      this.setState({ rx: evt.data });
    };
    
    this.ws.onclose = (evt) => {
      if (evt.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${evt.code} reason=${evt.reason}`);
      } else {
        console.error(`[close] Connection died : ${evt.code}`);
      }
    };

    this.ws.onerror = (error) => {
      console.error(`[error] ${error.message}`);
    };
  }

  getVideoMetadata = () => {
    return this.duration
  }

  onChange = (evt) => {
    this.setState({ msg: evt.target.value });
    console.log(`[message] from client. ${this.getVideoMetadata()}`)
    this.ws.send(`Duration: ${this.getVideoMetadata()}, Message: ${this.state.msg}`);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <label htmlFor="input-msg">Send Message:</label>
          <input className="input-msg" name="input-msg" type="text" value={ this.state.msg } onChange={ this.onChange } />

          <h2>Receive Message: </h2>
          <div className="speech-bubble" type="text">{ this.state.rx }</div>
        </header>
        <main>
          <video ref={this.appVideo} className="app-video" preload="metadata" controls src="Big_Buck_Bunny_1080_10s_5MB.mp4"></video>
        </main>
      </div>
    );
  }
}

export default App;
