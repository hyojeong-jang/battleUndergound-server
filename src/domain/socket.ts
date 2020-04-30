export interface Message {
  username: string;
  content:  string;
}

export interface JoinInfo {
  nickname: string;
  train: string;
}

export interface TrainRoom {
  [key: string]: Room
}

export interface Room {
  [key: string]: [string]
}
