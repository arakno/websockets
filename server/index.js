const http = require('http');
const ws = require('ws');

const port = process.env.PORT || '8080';
const wss = new ws.Server({noServer: true});
const server = http.createServer(accept)

function accept(req, res) {
  // all incoming requests must be websockets
  if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
    res.end();
    return;
  }

  // can be Connection: keep-alive, Upgrade
  if (!req.headers.connection.match(/\bupgrade\b/i)) {
    res.end();
    return;
  }

  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}

function onConnect(ws) {
  ws.on('message', function (message) {
    ws.send(`Hello from server, ${message}!`);
  });

}

server.listen(port);

server.on('listening', () => {
    console.log(`server is listening for requests on port ${server.address().port}`);
});
