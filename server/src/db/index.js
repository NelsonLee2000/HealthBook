const { Pool } = require('pg');
const { EX_DB_URL } = require('../constants');

//local connection
// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     port: 5432,
//     database: "healthbook"
// });

//internal connection
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
// });

//external connection
const pool = new Pool({
    connectionString: EX_DB_URL,
    ssl: {
        rejectUnauthorized: false, // Use this for connecting to Render.com databases
      },
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