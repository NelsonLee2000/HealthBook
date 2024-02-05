const passport = require('passport');

//validates that the jwt token is real
exports.userAuth = passport.authenticate('jwt', {session: false})