/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import path from 'path';

const http = require('http');
const { Server } = require('socket.io');

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      'https://mukterpatient.itscholarbd.com',
      'https://muktar.itscholarbd.com',
      'https://muktertv.itscholarbd.com',
      'wss://mukterbackend.itscholarbd.com',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
       'https://58c0-103-197-153-14.ngrok-free.app'
    ],
    credentials: true,
  }),
);


app.use('/api/v1', router);
app.use('/audio', express.static(path.join(__dirname, 'audio')));

// const test = async (req: Request, res: Response) => {
//   const a = 10;
//   res.send(a);
// };

// app.get('/', test);

app.get('/', (req: Request, res: Response) => {
  res.send({ success: true, message: 'Hi Next Level Developer !' });
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      'https://mukterpatient.itscholarbd.com',
      'https://muktar.itscholarbd.com',
      'https://muktertv.itscholarbd.com',
      'wss://mukterbackend.itscholarbd.com',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'https://58c0-103-197-153-14.ngrok-free.app'
    ],
    credentials: true,
  }
});

 declare global {
  var io: typeof Server
 }
 global.io = io;

module.exports = server;
