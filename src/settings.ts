import { Settings, VibrationType } from './interfaces';
import shell from './shell';

class SettingsManager {

    private settings: Settings = {
        vibrationType: VibrationType.long,
        timeInterval: 60000 //seconds
    };

    constructor() { }

    public setSettings = (settings: Settings) => {
        this.settings = settings;
        shell.setSettings(settings);
    }

    public getSettings = () => {
        return this.settings;
    }

}

export default new SettingsManager();
