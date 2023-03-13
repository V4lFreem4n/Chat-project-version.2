const http = require('http');
const path = require('path');
const WebSocket = require('ws')

const express = require('express');
const app = express();
const servidor = http.createServer(app);
const wss = new WebSocket.Server({ server : servidor });

const mensajes = [];

wss.on('connection', ws => {

  ws.on('message', message => {

    let mensaje = JSON.parse(message);
    mensajes.push(mensaje);

    wss.clients.forEach((client) => {

     

      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(mensajes));
      }
    });

    console.log(`Mensaje Recibido => ${mensaje.text}`);
    
  });

});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

servidor.listen(4000, () => {
  console.log('Server started on port 4000');
});


