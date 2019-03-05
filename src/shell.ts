import { PythonShell } from 'python-shell';
import { Settings, VibrationType } from './interfaces';

class ShellManager {

    //private shell = new PythonShell('./script.py');

    constructor() { }

    public setSettings = (settings: Settings) => {
        // send stuff eventually
    }

    public getSensorVals = () => {
        // get stuff
    }

    public sendMessage = (message: string) => {
        // send snooze/recalibrate/shutdown message to script
        console.log('Tried to send ' + message);
    }

}

export default new ShellManager();

