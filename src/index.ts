import express from 'express';
import bodyParser from 'body-parser';


class App {
  public application : express.Application;
  constructor(){
    this.application = express();
  }
}

const app = new App().application;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/users', require('../route/user'));

app.listen(4000, () => console.log('start'));
