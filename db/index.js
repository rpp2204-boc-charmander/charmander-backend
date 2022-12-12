const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD } = require('../config');
const { Pool } = require('pg');
const Promise = require('bluebird');

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: 5433,
});

const db = Promise.promisifyAll(pool);

db.connectAsync()
  .then(() => console.log('db connected'))
  .catch(() => console.log('error connecting to db'));

module.exports = {
  query: (text, params) => {
    return db.queryAsync(text, params);
  },
};
