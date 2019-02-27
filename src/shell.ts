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

}

export default new ShellManager();

