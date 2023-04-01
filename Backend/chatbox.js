const WebSocketServer = require("ws");
require("dotenv").config()

const wss = new WebSocketServer.Server({ port: 8000 });


wss.on('connection', function connection(ws) {
    console.log('WebSocket connection established.');


    ws.on('message', function incoming(message) {
        console.log('WebSocket message received:', message);


        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });


    ws.on('error', function (error) {
        console.error('WebSocket error:', error);
    });


    ws.on('close', function close() {
        console.log('WebSocket connection closed.');
    });
});