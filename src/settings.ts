import { Settings, VibrationType } from './interfaces';
import shell from './shell';

class SettingsManager {

    private settings: Settings = {
        vibrationType: VibrationType.long,
        timeInterval: 60000, // 60 seconds
        isSnoozed: false
    };

    constructor() { }

    public setSettings = (settings: Settings) => {
        this.settings = settings;
        shell.setSettings(settings);
    }

    public getSettings = () => {
        return this.settings;
    }

    public setSnooze = () => {
        if (this.settings.isSnoozed) {
            shell.sendMessage("unsnooze");
            // if success?
            this.settings.isSnoozed = false;
        } else {
            shell.sendMessage("snooze");
            // if success?
            this.settings.isSnoozed = true;
        }
    }

    public setRecalibrate = () => {
        shell.sendMessage("recalibrate");
    }

    public setShutdown = () => {
        shell.sendMessage("shutdown");
    }

}

export default new SettingsManager();
