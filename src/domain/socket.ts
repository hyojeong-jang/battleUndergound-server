export interface Message {
  nickname: string;
  content:  string;
}

export interface Chat {
  [key: string]: [Message]
}

export interface JoinInfo {
  nickname: string;
  train: string;
}

export interface User {
  ready: boolean,
  name: string
}

export interface TrainRoom {
  [key: string]: Room
}

export interface Room {
  [key: string]: [User]
}

export interface Info {
  name: string,
  turn: boolean,
  selectBox: string,
  selectedBoxes?: [string],
  winner?: boolean | string,
  gameScore?: number | null,
  station?: string,
  room: string
}

export interface GameStatus {
  [key: string]: [Info]
}

export interface Result {
  room: string,
  result: string,
  user?: string,
  gameScore: number,
  id: string
}
