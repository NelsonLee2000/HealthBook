const { Pool } = require('pg');

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    password: DB_PASSWORD,
});


module.exports = {
    query: (text, params) => pool.query(text, params),
};