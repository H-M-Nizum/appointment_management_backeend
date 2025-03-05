import mongoose from 'mongoose';
// import http from 'http';
const server = require("./app");
import config from './app/config';
// import { setupWebSocket } from './app/modules/WebSocket/websocket';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });

    // Set up WebSocket server
    //setupWebSocket(server);

  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.log(`😈 unhandledRejection detected, shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException detected, shutting down ...`);
  process.exit(1);
});
