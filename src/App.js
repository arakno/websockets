import { Component } from 'react'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.port = 8080;
    this.state = {
      msg: '',
      rx: ''
    };
  }

  componentDidMount(){
    this.connectWS();
  }

  connectWS = () => {
    const ws = new WebSocket(`ws://localhost:${this.port}/`);

    ws.onopen = () => {
        console.log('WebSocket Client Connected');
        ws.send('[open] Hi from client.');
    };

    ws.onmessage = (evt) => {
      console.log("[evt] Received: '" + evt.data + "'");
      this.setState({ rx: evt.data });
    };
    
    ws.onclose = (evt) => {
      if (evt.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${evt.code} reason=${evt.reason}`);
      } else {
        console.error(`[close] Connection died : ${evt.code}`);
      }
    };

    ws.onerror = (error) => {
      console.error(`[error] ${error.message}`);
    };

  }

  getVideoMetadata() {
    let msg, timestamp, duration;
    
  }

  onChange = (evt) => {
    this.setState({msg:evt.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <video preload="metadata" controls src="Big_Buck_Bunny_1080_10s_5MB.mp4"></video>
          <input type="text" value={ this.state.msg } onChange={ this.onChange } />
          <input type="text" value={ this.state.rx } />
        </header>
      </div>
    );
  }
}

export default App;
