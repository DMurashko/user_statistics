import express, { json, urlencoded } from 'express';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import fs from 'fs';
import JSONStream from 'JSONStream';
import es from "event-stream";
import sqlite3 from 'sqlite3';
import config from 'config';
import { createServer } from 'http';
import { dbInitialize } from './src/dbQueries.js';
import dbCheck from './src/dbCheck.js';
import { onError } from './src/serverStart.js';
import { normalizePort } from './src/serverStart.js';

const db = new sqlite3.Database('./database.sqlite');

const app = express();

const PORT = normalizePort(config.get('port') || 3001);
app.set('port', PORT);

const server = createServer(app);

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

//for testing purpose
async function test() {
	setTimeout(() => {
		db.all(`SELECT COUNT(*) FROM UserStatistics`, (error, data) => {
			if (error) {
				console.error;
			} else {
				console.log(data);
			}
		});
		db.all(`SELECT COUNT(*) FROM Users`, (error, data) => {
			if (error) {
				console.error;
			} else {
				console.log(data);
			}
		});
	}, 3000);
}

async function start() {
	try {
		await dbInitialize(() => {
			dbCheck('./users.json', fs, JSONStream, es, db, () => {
				dbCheck('./users_statistic.json', fs, JSONStream, es, db);
			});
		});
		server.listen(process.env.PORT || PORT, () => console.log(`Lisening on port :${PORT}`));
	} catch (e) {
		console.log('Server Error', e.message);
		onError(e, PORT);
	}
}

await start();

await test();