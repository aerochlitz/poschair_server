import { OPEN } from 'ws';
import { wss } from './app';
import { } from './interfaces';

// used for sending stuff to the front end
// send to everyone connected

const SIGNALS = {
    ERROR: 'error',
    SENSOR_DATA: 'sensorData',
    DONE: 'done',
    SCRIPT_READY: 'scriptReady'
}

class SignalManager {

    constructor() {

    }

    private send = (key: string, body: any) => {
        for (const client of wss.clients) {
            if (client.readyState === OPEN) {
                client.send(JSON.stringify({ key, body }));
            }
        }
    }

    public error = (error: string) => {
        this.send(SIGNALS.ERROR, error);
    }

    public sensorData = (sensorData: string) => {
        this.send(SIGNALS.SENSOR_DATA, sensorData);
    }

    public sendDone = () => {
        this.send(SIGNALS.DONE, "done");
    }

    public scriptReady = () => {
        this.send(SIGNALS.SCRIPT_READY, "scriptReady");
    }

}

export default new SignalManager();
