import express, {json, urlencoded} from 'express';
import cors from 'cors';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import sqlite3 from 'sqlite3';
import config from 'config';
import dbFiller from './src/dbFiller.js';
import {createServer} from 'http';
import {dbInitialize} from './src/dbQueries.js';
import {onError} from './src/serverStart.js';
import {normalizePort} from './src/serverStart.js';

const db = new sqlite3.Database('./database.sqlite');
const app = express();
const PORT = normalizePort(config.get('port') || 3001);
const server = createServer(app);

app.set('port', PORT);

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({extended: false}));
app.use(cors(null));
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
//app.use(express.static(path.join(__dirname, 'public')));

//for testing purpose
async function test() {
  setTimeout(() => {
    db.all('SELECT COUNT(*) FROM users_statistic', (error, data) => {
      if (error) {
        console.error();
      } else {
        console.log(data);
      }
    });
    db.all('SELECT COUNT(*) FROM users', (error, data) => {
      if (error) {
        console.error();
      } else {
        console.log(data);
      }
    });
  }, 3000);
}

async function start() {
  try {
    await dbInitialize(async () => {
      const df = new dbFiller();

      await df.dbCheck(df.USERS_PATH, db);
      await df.dbCheck(df.USERS_STATISTIC_PATH, db);
    });
    server.listen(process.env.PORT || PORT, () => console.log(`Lisening on port :${PORT}`));
  } catch (e) {
    console.log('Server Error', e.message);
    onError(e, PORT);
  }
}

await start();
await test();
