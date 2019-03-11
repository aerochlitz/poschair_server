import { PythonShell } from 'python-shell';
import { Settings, VibrationType } from './interfaces';
import signals from './signals';

class ShellManager {

    private myShell = new PythonShell('../scripts/poschair.py');

    constructor() { 
        console.log('Shell constructor');
        
        const shell = new PythonShell('../scripts/poschair.py', { pythonOptions: ['-u'] });

        shell.on('message', (message) => {
            console.log('Read from python script: ' + message);
            this.processMessage(message);
        });
    }

    private processMessage = (gotMessage: string) => {
        // right now, only getting sensor data
        // probably will want to move interpreting inputs here from frontend
        this.sendSensorData(gotMessage);
    }

    private sendSensorData = (sensorData: string) => {
        signals.sensorData(sensorData);
    }

    public sendMessage = (message: string) => {
        // send snooze/recalibrate/shutdown message to script
        console.log('Send to python script: ' + message);
        this.myShell.send(message);
    }

}

export default new ShellManager();

