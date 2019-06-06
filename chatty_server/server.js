const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log(wss.clients.size)
  //when new user connects, send the number of client to front end
  wss.clients.forEach(socket => {
      socket.send (wss.clients.size);
    });

  //take incoming message and insert a uuid to them and send them back
  ws.on('message', (message) => {
    const obj = JSON.parse(message);
    if (obj.type === "postMessage"){
      obj.id = uuid();
      obj.type = "incomingMessage"
      console.log('obj',obj);
    }
    if (obj.type === "postNotification"){
      obj.id = uuid();
      obj.type = "incomingNotification"
      console.log('obj',obj);
    }
    // this also works with  broadcast() function below
    // wss.broadcast(message);
    wss.clients.forEach(socket => {
      socket.send (JSON.stringify(obj));
    });
  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    wss.clients.forEach(socket => {
      socket.send (wss.clients.size);
    });
  });
});



// this also works
// wss.broadcast = function broadcast(data) {
//   wss.clients.forEach(function each(client) {
//     client.send(data);
//   });
// };