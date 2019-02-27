
export interface Message {
  key: string;
  body: any;
}

export interface SensorData {
  bTopL: number;
  bTopR: number;
  bBtmL: number;
  bBtmR: number;
  sTopL: number;
  sTopR: number;
  sBtmL: number;
  sBtmR: number;
}

export enum VibrationType {
  short = "short",
  long = "long",
  beep = "beep"
}

export interface Settings {
  vibrationType: VibrationType;
  timeInterval: number;
}
