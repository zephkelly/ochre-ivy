require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo');
var authRoutes = require('./routes/authRoutes');
var blogRoutes = require('./routes/blogRoutes');
var app = express();
var PORT = process.env.PORT;
app.use(express.static('./'));
app.set('view engine', 'ejs');
//Sessions
var oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DB_CONNECTION,
        ttl: 14 * 24 * 60 * 60
    }),
    cookie: { maxAge: oneDay },
    resave: false
}));
//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//Database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    app.listen(PORT, function () { console.log('Listening on port ' + PORT); });
})["catch"](function (err) { return console.log(err); });
//Routes
app.get('/', function (req, res) {
    res.sendFile('index.html');
});
app.use(authRoutes);
app.use(blogRoutes);
