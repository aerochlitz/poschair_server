import { PythonShell } from 'python-shell';
import { Settings, VibrationType } from './interfaces';
import signals from './signals';

class ShellManager {

    private myShell = new PythonShell('../scripts/poschair.py');

    constructor() { 
        console.log('Shell constructor');
        
        const shell = new PythonShell('../scripts/poschair.py', { pythonOptions: ['-u'] });

        shell.on('message', (message) => {
            console.log(message);
            signals.sensorData(message);
        });
    }


    public setSettings = (settings: Settings) => {
        // send stuff eventually
    }

    public getSensorVals = () => {

    }

    public sendMessage = (message: string) => {
        // send snooze/recalibrate/shutdown message to script
        console.log('Tried to send ' + message);
        this.myShell.send(message);
    }

}

export default new ShellManager();

