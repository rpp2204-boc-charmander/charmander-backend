const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD } = require('../config');
const { Pool } = require('pg');

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: 5433,
});

pool.connect((err) => {
  if (err) throw err;
  console.log('db connected');
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
