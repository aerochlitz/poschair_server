import * as WebSocket from 'ws';
import signals from './signals';
import settings from './settings';
import { Message, Settings } from './interfaces';

// TODO: Check to see if the clients need tokens or if the server can handle multiple instances

const ENDPOINTS = {
  CONNECT: 'connection',
  GET_SETTINGS: 'getSettings',
  SET_SETTINGS: 'setSettings',
  SNOOZE: 'snooze',
  RECALIBRATE: 'recalibrate',
  SHUTDOWN: 'shutdown'
};

/// Functionality ///

/// Server Implementation ///

export const wss = new WebSocket.Server({ port: 8080 });

wss.on(ENDPOINTS.CONNECT, (ws: WebSocket) => {
  console.log(ENDPOINTS.CONNECT);

  ws.onmessage = (msg) => {
    let data: Message = JSON.parse(msg.data.toString());

    switch (data.key) {
      case ENDPOINTS.GET_SETTINGS: {
        console.log(ENDPOINTS.GET_SETTINGS);
        ws.send(JSON.stringify({ key: ENDPOINTS.GET_SETTINGS, body: settings.getSettings() }));
        break;
      }

      case ENDPOINTS.SET_SETTINGS: {
        const smallSettings: Settings = data.body;
        console.log(ENDPOINTS.SET_SETTINGS);
        settings.setSettings(smallSettings);
        break;
      }

      case ENDPOINTS.SNOOZE: {
        settings.setSnooze();
        console.log(ENDPOINTS.SNOOZE);
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

      default:
        signals.error('Endpoint does not exist');
        console.log('Endpoint does not exist');
        break;
    }

    ws.send(JSON.stringify({ key: ENDPOINTS.CONNECT, body: {} }));
  }
});