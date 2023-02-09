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
app.set('views', __dirname + '/server/views');
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
    var _a;
    if (req.session.userid) {
        var userData = { name: req.session.name };
        if (req.session.roles == 'admin') {
            var siteData = { blogCount: 0, recipeCount: 0 };
            if ((_a = req.query) === null || _a === void 0 ? void 0 : _a.loggingIn) {
                var loggedData = { loggedMessage: true };
                res.status(200).render('admin/admin-index', { loggedData: loggedData, userData: userData, siteData: siteData });
            }
            else {
                var loggedData = { loggedMessage: false };
                res.status(200).render('admin/admin-index', { loggedData: loggedData, userData: userData, siteData: siteData });
            }
        }
        return;
    }
    res.status(200).sendFile(__dirname + '/index.html');
});
app.use(authRoutes);
app.use(blogRoutes);
app.use(adminRoutes);
app.use(express.static('./assets'));
app.use(express.static('./public'));
