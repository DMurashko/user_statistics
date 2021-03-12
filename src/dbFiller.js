import filesystem from 'fs';
import JSONStream from 'JSONStream';
import eventStream from 'event-stream';

export default class dbFiller {
  USERS_PATH = './users.json';
  USERS_STATISTIC_PATH = './users_statistic.json';

  #filenameQueryMap;

  constructor() {
    this.#filenameQueryMap = new Map();

    this.#filenameQueryMap.set(this.USERS_PATH, (data) => `
      INSERT INTO users (
        id,
        first_name,
        last_name,
        email,
        gender,
        ip_address
      ) VALUES (
        "${data.id}", 
        "${data.first_name}", 
        "${data.last_name}", 
        "${data.email}", 
        "${data.gender}",
        "${data.ip_address}")
      `);
    this.#filenameQueryMap.set(this.USERS_STATISTIC_PATH, (data) => `
      INSERT INTO users_statistic (
        user_id, 
        date, 
        page_views, 
        clicks
      ) VALUES (
        "${data.user_id}", 
        "${data.date}", 
        ${data.page_views}, 
        ${data.clicks})
    `);
  }

  async dbCheck(filename, database) {
    if (typeof filename !== 'string') {
      throw new Error('');
    }

    const stream = filesystem.createReadStream(filename, {
      highWaterMark: 50 * 102400,
      encoding: 'utf-8'
    });

    let checkCounter = 0;

    await stream.pipe(JSONStream.parse('*')).pipe(
      eventStream.through((data) => {
        const query = this.#filenameQueryMap.get(filename)(data);

        database.run(query,
          function (error) {
            if (error) {
              if (error.errno === 19) {
                //console.log('An item already exists');
              } else {
                console.log(error);
              }
            }
            checkCounter++;
          });
      })
    );

    console.log(checkCounter);
  }
}
