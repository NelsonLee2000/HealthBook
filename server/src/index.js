const express = require('express');
const { PORT, CLIENT_URL } = require('./constants');
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

//import passport middleware
require('./middlewares/passport-middleware')

//initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: CLIENT_URL, credentials: true})); 
app.use(passport.initialize())

//import routes
const authRoutes = require('./routes/auth');

//initialize routes
app.use('/api', authRoutes);

//dynamic port
const port = process.env.PORT || 4000;

//app start

const appStart = () => {
    try {
        app.listen(port, () => {
            console.log(`The app is running at port ${port}`);
        });
    } catch (err) {
        console.error(err.message);
    }
};

appStart();