import { Message, JoinInfo, TrainRoom, Room, User, Info, Chat, GameStatus, Result } from '../domain/socket';
import { DB } from '../domain/db';

const db = new DB();

const trainRoom: TrainRoom = {};
const room: Room = {};
const chat: Chat = {};

let gameStatus: GameStatus = {};

export const socket = (io: any) => {
  io.on('connection', (socket: any) => {
    socket.on('connected', (train_id: string) => {
      for (const train in trainRoom) {
        if (train === train_id) return;
      }
      trainRoom[train_id] = {};
      socket.emit('connected', train_id);
    });

    socket.on('joinRoom', (joinInfo: JoinInfo) => {
      const randomString: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
      const user: User = { ready: false, name: joinInfo.nickname };
      const userTrain = trainRoom[joinInfo.train];

      for (const room in userTrain) {
        if (userTrain[room].length === 1) {
          userTrain[room].push(user);
          socket.join(room);

          return io.in(room).emit('joined', userTrain[room], room);
        }
      }

      userTrain[randomString] = [user];
      socket.join(randomString);
      io.in(randomString).emit('joined', [user], randomString);
    });

    socket.on('message', (room: string, message: Message) => {
      if (chat[room]) {
        chat[room].push(message);
        io.emit('messageList', chat[room]);
      } else {
        chat[room] = [message];
      }
    });

    socket.on('onReady', (userInfo: JoinInfo, roomId: string) => {
      const userTrain = trainRoom[userInfo.train];
      const userRoom = userTrain[roomId];

      userRoom.forEach(user => {
        if (user.name === userInfo.nickname) {
          user.ready = !user.ready
        }
      })

      return io.emit('readyStatus', userRoom);
    });

    socket.on('initialInfo', (initialInfo: Info) => {
      const room: string = initialInfo.room;

      if (gameStatus.hasOwnProperty(room)) {
        gameStatus[room].push(initialInfo);
      } else {
        gameStatus[room] = [initialInfo];
      }
    });

    socket.on('updateGameInfo', (gameInfo: Info) => {
      const room: string = gameInfo.room;

      gameStatus[room].forEach((userStatus) => {
        if (userStatus.name === gameInfo.name) {
          userStatus.selectBox = gameInfo.selectBox;
          userStatus.selectedBoxes?.push(gameInfo.selectBox);
          userStatus.turn = gameInfo.turn;
        } else {
          userStatus.turn = !gameInfo.turn;
        }
      })

      return io.in(room).emit('gameStatus', gameStatus[room]);
    });

    socket.on('gameResult', async (result: Result) => {
      const room: string = result.room;

      await db.updateGameScore(result.id, result.gameScore);
      const topRankList = await db.read();

      if (result.result === 'draw') {
        gameStatus[room].forEach((userStatus) => {
          userStatus.winner = 'draw'
        })
      } else if (result.result === 'win') {
        gameStatus[room].forEach((userStatus) => {
          if (userStatus.name === result.user) {
            userStatus.winner = true;
            userStatus.gameScore = result.gameScore;
          } else {
            userStatus.winner = false;
          }
        })
      }
      return io.in(room).emit('updatedGameResult', topRankList, gameStatus[room]);
    });

    socket.on('closeGameRoom', (roomId: string) => {
      socket.disconnect(true);
      delete room[roomId];
    })
  });
}
