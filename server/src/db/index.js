const { Pool } = require('pg');
const { DB_USER, DB_HOST, DB_PORT, DB_DATABASE, DB_PASSWORD } = require('../constants');

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    password: DB_PASSWORD,
});

pool.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database!');
    }
  });

module.exports = {
    query: (text, params) => pool.query(text, params),
};