const express = require('express');
var WebSocket = require('ws');

const app = express();
const httpsPort = 8080;
var https = require('https');
var fs = require('fs');
var path = require('path'); 

// 1.1 Read SSL details on server
// var certFilePath = path.resolve(__dirname, "divyw.com.crt");
// var keyFilePath = path.resolve(__dirname, "divyw.com.key");

//local
var certFilePath = "./server.crt";
var keyFilePath = "./server.key";
var certKeyFile = fs.readFileSync(keyFilePath);
var certFile = fs.readFileSync(certFilePath);
var credentials = {
key  : certKeyFile,
cert : certFile
};

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });

app.use(express.static(path.join(__dirname, "static")));

var server = https.createServer(credentials, app).listen(httpsPort, () => {
  console.log('API listening on HTTPS port ' + httpsPort + '.')
});

var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({server: server})


  wss.on('connection', function(ws) {
    ws.on('message', function(message) {
      // Broadcast any received message to all clients
      console.log('received: %s', message);
      wss.broadcast(message);
    });
  });
  
  wss.broadcast = function(data) {
    this.clients.forEach(function(client) {
      if(client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };
