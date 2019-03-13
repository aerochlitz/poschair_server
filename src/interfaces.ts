
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
  words: string;
}

export enum VibrationType {
  short = "Short",
  long = "Long"
}

export interface Settings {
  timeInterval: number;
}
