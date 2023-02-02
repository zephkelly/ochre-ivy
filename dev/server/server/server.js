require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
var mongoose = require('mongoose');
var session = require('express-session');
var fileUpload = require('express-fileupload');
var MongoStore = require('connect-mongo');
var authRoutes = require('./server/routes/authRoutes');
var blogRoutes = require('./server/routes/blogRoutes');
var adminRoutes = require('./server/routes/adminRoutes');
var app = express();
var PORT = process.env.PORT;
app.set('view engine', 'ejs', 'html');
app.set('views', __dirname, '/server/views');
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
app.use(fileUpload());
//Database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    app.listen(PORT, function () { console.log('Listening on port ' + PORT); });
})
    .catch(function (err) { return console.log(err); });
//Routes
app.get('/', function (req, res) {
    if (req.session.userid) {
        var userData = { name: req.session.name };
        if (req.session.roles == 'admin') {
            var siteData = { blogCount: 0, recipeCount: 0 };
            res.status(200).render('admin/admin-index', { userData: userData, siteData: siteData });
            return;
        }
        else {
            res.status(200).render('index', { userData: userData });
            return;
        }
    }
    res.status(200).sendFile(__dirname + '/index.html');
});
app.use(authRoutes);
app.use(blogRoutes);
app.use(adminRoutes);
app.use(express.static('./assets'));
app.use(express.static('./public'));
