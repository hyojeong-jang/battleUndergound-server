import { ConnectionOptions, connect, connection } from 'mongoose';

export default function db () {
  try {
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    };
    connect(`${process.env.MONGO_DB_URL}`, options);
    connection.on('err', () => console.log('mongoose connection Error'));
    connection.once('open', () => console.log('mongoose connected'));
  } catch (err) {
    console.error(err.message);
  }
}
