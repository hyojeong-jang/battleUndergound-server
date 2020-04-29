import { Message, JoinInfo } from '../domain/socket';

export const socket = (io: any) => {
  console.log('socket on & disconnected');

  io.on('connection', (socket: any) => {
    console.log('socket connected')

    socket.on('joinRoom', (joinInfo: JoinInfo) => {
      console.log('join room');
      console.log(joinInfo)
      socket.join(joinInfo.train);
    })

    socket.on('message', (message: Message) => {
        io.emit('message', JSON.stringify(message));
    });
  });
}
