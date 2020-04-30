import { Message, JoinInfo, TrainRoom, Room } from '../domain/socket';

let trainRoom: TrainRoom = {};
let room: Room = {};

export const socket = (io: any) => {
  console.log('socket on & disconnected');

  io.on('connection', (socket: any) => {
    console.log('socket connected');

    let rooms = Object.keys(socket.rooms);
    console.log(rooms);

    socket.on('connected', (train_id: string) => {
      for (const train in trainRoom) {
        if (train === train_id) {
          return socket.emit('roomCheck', trainRoom[train_id]);
        }
      }

      trainRoom[train_id] = room;
      socket.emit('roomCheck', null);
    })

    socket.on('joinRoom', (joinInfo: JoinInfo) => {
      const randomString: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
      const userTrain = trainRoom[joinInfo.train];

      for (const room in userTrain) {
        if (userTrain[room].length === 1) {
          userTrain[room].push(joinInfo.nickname);
          console.log('in', room, 'room');
          socket.join(room);
          return io.emit('joined', 'full');
        }
      }
      userTrain[randomString] = [joinInfo.nickname];
      socket.join(randomString);
      io.emit('joined', 'createRoom');
    })

    socket.on('message', (message: Message) => {
      io.emit('message', JSON.stringify(message));
    });
  });
}

