export default async function dbCheck(file, fs, JSONStream, es, db, cb) {
	if (typeof file === 'string') {
		const rs = fs.createReadStream(file, {
			highWaterMark: 50*1024,
			encoding: 'utf-8'
		});
		let checkCounter = 0;

		await rs.pipe(JSONStream.parse('*')).pipe(
			es.through((data) => {
				const userStatisticsSql = `INSERT 
					INTO UserStatistics (
						user_id, 
						date, 
						page_views, 
						clicks) 
					VALUES (
						"${data.user_id}", 
						"${data.date}", 
						${data.page_views}, 
						${data.clicks})`;

				const usersSql = `INSERT 
					INTO Users (
						id,
						first_name,
						last_name,
						email,
						gender,
						ip_address) 
					VALUES (
						"${data.id}", 
						"${data.first_name}", 
						"${data.last_name}", 
						"${data.email}", 
						"${data.gender}",
						"${data.ip_address}")`;

				function currentSqlQuery() {
					switch (file) {
						case './users.json' || 'users.json':
							return usersSql;
						case './users_statistic.json' || 'users_statistic.json': 
							return userStatisticsSql;
					}
				}

				db.run(currentSqlQuery(),
				function (error) {
					if (error) {
						if (error.errno == 19) {
							//console.log('An item alredy exists');
						} else {
							console.log(error);
						}
					}
					checkCounter++;
				});
			})
		);
		
		if (cb)
			await cb();
		console.log(checkCounter);
	}
}
