const fs = require('fs');
const JSONStream = require('JSONStream');
const es = require("event-stream");

const rs = fs.createReadStream('./users_statistic.json', {
	highWaterMark: 256,
	end: 512,
	encoding: 'utf-8'
});

const buffer = [];

rs.pipe(JSONStream.parse('*')).pipe(
		es.through((data) => {
			console.log(data);
			buffer.push(data);
		}),
		function end() {
			console.log(buffer);
		}
)

/*rs.on('data', chunk => {
	console.log('data');
	console.log({ chunk });
});*/
