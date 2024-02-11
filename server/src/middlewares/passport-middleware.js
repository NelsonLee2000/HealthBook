const { SECRET } = require("../constants");
const passport = require('passport');
const { Strategy } = require('passport-jwt');
const db = require("../db");


const cookieExtractor = function (req) {
    let token = null;
    if (req && req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
        return token;
    }
};

const opts = {
    secretOrKey: SECRET,
    jwtFromRequest: cookieExtractor,
};

//returns an object user with a corresponding id and email 
passport.use(
    new Strategy(opts, async ({ id }, done) => {
        try {
            const {rows} = await db.query('SELECT user_id, email FROM \"user\" WHERE user_id=$1', 
            [id])

            if (!rows.length) {
                throw new Error('401 not authorized')
            }

            let user = {id: rows[0].user_id, email: rows[0].email};

            return await done(null, user);
        } catch (err) {
            console.error(err.message);
            done(null, false);
        }
    })
);



