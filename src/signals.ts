import { OPEN } from 'ws';
import { wss } from './app';
import { } from './interfaces';

const SIGNALS = {
    ERROR: 'error'
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

}

export default new SignalManager();
