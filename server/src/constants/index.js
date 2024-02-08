const {config} = require('dotenv')
config ()

module.exports = {
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    SECRET: process.env.SECRET,
    EX_DB_URL: process.env.EX_DB_URL
}