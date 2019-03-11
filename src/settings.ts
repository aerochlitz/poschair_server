import { Settings, VibrationType } from './interfaces';
import shell from './shell';

class SettingsManager {

    private settings: Settings = {
        timeInterval: 15, // seconds
    };

    constructor() { }

    public setInterval = (interval: number) => {
        this.settings.timeInterval = interval;
        shell.sendMessage("5"+interval);
    }

    public getInterval = () => {
        return this.settings.timeInterval;
    }

    public setSnooze = (snoozeTime: number) => {
        shell.sendMessage("4"+snoozeTime);
    }

    public setRecalibrate = () => {
        shell.sendMessage("2");
    }

    public setShutdown = () => {
        shell.sendMessage("1");
    }

}

export default new SettingsManager();
