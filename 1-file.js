const fs = require('fs');
const JSONStream = require('JSONStream');
const es = require("event-stream");
const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('./database.sqlite', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to the test database.');
	db.run(`CREATE TABLE IF NOT EXISTS UserStatistics (
		user_id INTEGER PRIMARY KEY NOT NULL,
		date VARCHAR(10) NOT NULL,
		page_views INTEGER NOT NULL,
		clicks INTEGER NOT NULL
	)`);
});

const rs = fs.createReadStream('./users_statistic.json', {
	highWaterMark: 256,
	end: 512,
	encoding: 'utf-8'
});

const buffer = [];

rs.pipe(JSONStream.parse('*')).pipe(
		es.through((data) => {
			console.log(data);
			//buffer.push(data);
			db.run(`INSERT INTO UserStatistics (user_id, date, page_views, clicks) VALUES 
			("${data.user_id}", "${data.date}", ${data.page_views}, ${data.clicks})`,
			function (error, data) {
				if (error) {
					console.error;
				} else {
					console.log('pushed into db successfully');
				}
			});
		}),
		function end() {
			console.log(buffer);
			db.get(`SELECT * FROM UserStatistics`, (error, data) => {
				if (error) {
					next(error);
				} else {
					console.log(data);
				}
			});
		}
)

/*rs.on('data', chunk => {
	console.log('data');
	console.log({ chunk });
});*/
