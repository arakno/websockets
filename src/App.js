import { Component } from 'react'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      msg: ''
    }
    this.port = 8080
  }

  componentDidMount(){
    this.connectWS()
  }

  connectWS() {
    const ws = new WebSocket(`ws://localhost:${this.port}/`);
    ws.onopen = function() {
        console.log('WebSocket Client Connected');
        ws.send('Hi this is web client.');
    };
    ws.onmessage = function(e) {
      console.log("Received: '" + e.data + "'");
    };
  }

  onChange = (e) => {
    this.setState({msg:e.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <video preload="metadata" controls src="Big_Buck_Bunny_1080_10s_5MB.mp4"></video>
          <input type="text" value={ this.state.msg } onChange={ this.onChange } />
        </header>
      </div>
    );
  }
}

export default App;
