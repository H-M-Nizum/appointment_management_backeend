import { Server } from 'http';
import WebSocket from 'ws'; 

// Export the WebSocket server instance so you can use it in other files
export let wss: WebSocket.Server;

export const setupWebSocket = (server: Server) => {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws: WebSocket) => {
    console.log('New WebSocket connection');
    ws.send(JSON.stringify({ message: 'Connected to WebSocket server' }));

    ws.on('message', (message) => {
      console.log('Received message:', message);
    });
  });
};
