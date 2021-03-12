import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite');

export async function dbInitialize(cb) {

  function createUserStatisticsTable() {
    db.run(`CREATE TABLE IF NOT EXISTS users_statistic (
			user_id INTEGER NOT NULL,
			date VARCHAR(10) NOT NULL,
			page_views INTEGER NOT NULL,
			clicks INTEGER NOT NULL,
			PRIMARY KEY (user_id, date)
		)`, cb);
  }

  if (db && db.run) {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS users (
				id INTEGER PRIMARY KEY NOT NULL,
				first_name TEXT NOT NULL,
				last_name TEXT NOT NULL,
				email TEXT NOT NULL,
				gender TEXT NOT NULL,
				ip_address TEXT NOT NULL
			)`, createUserStatisticsTable);
    });
  }
}

export async function getConsolidatedUserInfo(quantity, page, cb) {
  if (db && db.run && quantity && page) {
    const offset = page * quantity;

    db.all(`SELECT 
			id,
			first_name,
			last_name,
			email,
			gender,
			ip_address, 
			SUM(page_views), 
			SUM(clicks) 
				FROM users u 
				INNER JOIN users_statistic s 
				ON s.user_id = u.id 
				GROUP BY id
				ORDER BY email
				LIMIT ${quantity}
				OFFSET ${offset}
		`, (err, rows) => {
      if (!!rows) {
        cb(rows);
      }
      if (!!err) {
        console.log(err);
      }
    });
  }
}

export async function getUserDataByDate(user_id, from, to, cb) {
  if (db && db.run && user_id && from && to && from.length > 10 && to.length > 10) {
    //const limit = page * quantity;
    db.all(`SELECT 
			*,
			SUM(page_views), 
			SUM(clicks) 
				FROM  users_statistic
				WHERE date BETWEEN ${from} AND ${to}
				GROUP BY user_id
				ORDER BY date ASC
		`, (err, rows) => {
      if (!!rows) {
        cb(rows);
      }
      if (!!err) {
        console.log(err);
      }
    });
  }
}
