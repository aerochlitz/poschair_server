import * as WebSocket from 'ws';
import signals from './signals';
import service from './service';
import { Message } from './interfaces';

// TODO: Check to see if the clients need tokens or if the server can handle multiple instances

const ENDPOINTS = {
  CONNECT: 'connection',
  REQUEST: 'request'
};

/// Functionality ///

/// Server Implementation ///

export const wss = new WebSocket.Server({ port: 8080 });

wss.on(ENDPOINTS.CONNECT, (ws: WebSocket) => {
  console.log(ENDPOINTS.CONNECT);

  ws.onmessage = (msg) => {
    let data: Message = JSON.parse(msg.data.toString());

    switch (data.key) {
      case ENDPOINTS.REQUEST:
      const str: string = data.body;
      console.log(ENDPOINTS.REQUEST, str);
      break;

      default:
      signals.error('Endpoint does not exist');
      break;
    }

    ws.send(JSON.stringify({ key: ENDPOINTS.CONNECT, body: {} }));
  }
});