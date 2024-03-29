import { PythonShell } from 'python-shell';
import { Settings, VibrationType } from './interfaces';
import signals from './signals';

class ShellManager {

    // private myShell = new PythonShell('../scripts/poschair.py', { pythonOptions: ['-u'] });
    private myShell = new PythonShell('../scripts/main.py', { pythonOptions: ['-u'] });

    constructor() { 
        this.registerForMessages();
    }

    private registerForMessages = () => {
        console.log('PyShell: registered script for messages');
        this.myShell.on('message', (message) => {
            console.log('Read from python script: ' + message);
            this.processMessage(message);
        });
    }

    private processMessage = (gotMessage: string) => {
        // check first 4 chars of message to decide how to handle
        var type = gotMessage.slice(0,4);
        if (type == "Done") {
            // unfreeze UI
            signals.sendDone();
        } else if (type == "Data") {
            var sendMessage = gotMessage.slice(5);
            this.sendSensorData(sendMessage);
        } else if (type == "Hewo") {
            signals.scriptReady();
        } else {
            // maybe error handling will be a thing one day
        }

        // this.sendSensorData(gotMessage);
    }

    private sendSensorData = (sensorData: string) => {
        signals.sensorData(sensorData);
    }

    public sendMessage = (message: string) => {
        // send snooze/recalibrate/shutdown message to script
        console.log('Send to python script: ' + message);
        this.myShell.send(message);
    }

    public restartScript = () => {
        this.myShell.terminate();
        console.log('PyShell: terminate old script');
        this.sendSensorData("[2, 2, 2, 2, 2, 2, 2, 2] Restarting script");
        this.myShell = new PythonShell('../scripts/main.py', { pythonOptions: ['-u'] });
        this.registerForMessages();
    }

}

export default new ShellManager();

