const { Pool } = require('pg');
const { IN_DB_URL, DB_USER, DB_HOST, DB_PORT, DB_DATABASE, DB_PASSWORD } = require('../constants');

//local connection
// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     port: 5432,
//     database: "healthbook"
// });

//internal connection
const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    password: DB_PASSWORD,
});

//external connection
// const pool = new Pool({
//     connectionString: EX_DB_URL,
//     ssl: {
//         rejectUnauthorized: false, // Use this for connecting to Render.com databases
//       },
// });

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