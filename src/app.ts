import * as WebSocket from 'ws';
import signals from './signals';
import settings from './settings';
import { Message, Settings } from './interfaces';
import shell from './shell';

// TODO: Check to see if the clients need tokens or if the server can handle multiple instances

const ENDPOINTS = {
  CONNECT: 'connection',
  GET_INTERVAL: 'getInterval',
  SET_INTERVAL: 'setInterval',
  SNOOZE: 'snooze',
  RECALIBRATE: 'recalibrate',
  SHUTDOWN: 'shutdown',
  RERUN_SCRIPT: 'rerunScript'
};

/// Functionality ///

/// Server Implementation ///

export const wss = new WebSocket.Server({ port: 8080 });

wss.on(ENDPOINTS.CONNECT, (ws: WebSocket) => {
  console.log(ENDPOINTS.CONNECT);

  ws.onmessage = (msg) => {
    let data: Message = JSON.parse(msg.data.toString());

    switch (data.key) {
      case ENDPOINTS.GET_INTERVAL: {
        console.log(ENDPOINTS.GET_INTERVAL);
        ws.send(JSON.stringify({ key: ENDPOINTS.GET_INTERVAL, body: settings.getInterval() }));
        break;
      }

      case ENDPOINTS.SET_INTERVAL: {
        const newInterval: number = data.body;
        console.log(ENDPOINTS.SET_INTERVAL + newInterval);
        settings.setInterval(newInterval);
        break;
      }

      case ENDPOINTS.SNOOZE: {
        const snoozeTime: number = data.body;
        console.log(ENDPOINTS.SNOOZE + snoozeTime);
        settings.setSnooze(snoozeTime);
        break;
      }

      case ENDPOINTS.RECALIBRATE: {
        settings.setRecalibrate();
        console.log(ENDPOINTS.RECALIBRATE);
        break;
      }

      case ENDPOINTS.SHUTDOWN: {
        settings.setShutdown();
        console.log(ENDPOINTS.SHUTDOWN);
        break;
      }

      case ENDPOINTS.RERUN_SCRIPT: {
        shell.restartScript();
        console.log(ENDPOINTS.RERUN_SCRIPT);
        break;
      }

      default:
        signals.error('Endpoint does not exist');
        console.log('Endpoint does not exist');
        break;
    }

    ws.send(JSON.stringify({ key: ENDPOINTS.CONNECT, body: {} }));
  }
});