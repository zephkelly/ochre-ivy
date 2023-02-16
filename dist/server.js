"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const MongoStore = require('connect-mongo');
const authRoutes = require('./server/routes/authRoutes');
const blogRoutes = require('./server/routes/blogRoutes');
const adminRoutes = require('./server/routes/adminRoutes');
const analyticsRoutes = require('./server/routes/analyticsRoutes');
// @ts-ignore
const analyticsModel_1 = require("./server/models/analyticsModel");
const app = express();
const PORT = process.env.PORT;
app.set('view engine', 'ejs', 'html');
app.set('views', __dirname + '/server/views');
//Sessions
const oneDay = 1000 * 60 * 60 * 24;
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
    .then(() => {
    app.listen(PORT, () => { console.log('Listening on port ' + PORT); });
    // Analytics
    analyticsModel_1.Analytics.Model.findOne({}, (err, analytics) => {
        if (err) {
            console.log(err);
        }
        else {
            if (!analytics) {
                const analytics = new analyticsModel_1.Analytics.Model({
                    siteHits: 0,
                    blogViews: 0,
                    recipeViews: 0,
                    blogCount: 0,
                    recipeCount: 0
                });
                analytics.save();
            }
        }
    });
})
    .catch((err) => console.log(err));
function updateAnalytics(req, res, next) {
    analyticsModel_1.Analytics.Model.findOne({}, (err, analytics) => {
        if (err) {
            console.log(err);
        }
        else {
            analytics.siteHits += 1;
            analytics.save();
        }
    });
    return next();
}
//Routes
app.get('/', updateAnalytics, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = { name: null, admin: false, notification: false };
    if (req.session.userid) {
        session.name = req.session.name;
        if (req.session.roles == 'admin') {
            session.admin = true;
            if ((_a = req.query) === null || _a === void 0 ? void 0 : _a.loggingIn) {
                session.notification = true;
            }
            return res.status(200).render('admin/admin-index', { session, siteData: yield getSiteData(), recentBlogs: yield getBlogsData(), recipeBlogs: yield getRecipesData() });
        }
    }
    return res.status(200).render('index', { session, recentBlogs: yield getBlogsData(), recipeBlogs: yield getRecipesData() });
    //Functions
    function getBlogsData() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetch('http://localhost:' + process.env.PORT + '/api/blog?filter=newest&limit=3&display=true');
            const recentBlogs = yield data.json();
            return recentBlogs;
        });
    }
    function getRecipesData() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetch('http://localhost:' + process.env.PORT + '/api/blog?tag=recipe&limit=5&display=false');
            const recipeBlogs = yield data.json();
            return recipeBlogs;
        });
    }
    function getSiteData() {
        return __awaiter(this, void 0, void 0, function* () {
            const siteData = {
                blogCount: null,
                recipeCount: null,
                blogViews: null,
            };
            const counts = yield fetch('http://localhost:' + process.env.PORT + '/api/blog?count=true');
            const countsData = yield counts.json();
            siteData.blogCount = countsData.blogCount;
            siteData.recipeCount = countsData.recipeCount;
            const views = yield fetch('http://localhost:' + process.env.PORT + '/api/analytics');
            const viewsData = yield views.json();
            siteData.blogViews = viewsData.blogViews;
            return siteData;
        });
    }
}));
app.get('/about', (req, res) => {
    const session = { name: null, admin: false, notification: false };
    if (req.session.userid) {
        session.name = req.session.name;
        if (req.session.roles == 'admin') {
            session.admin = true;
        }
    }
    res.status(200).render('about', { session });
});
app.use(authRoutes);
app.use(blogRoutes);
app.use(adminRoutes);
app.use(analyticsRoutes);
app.use(express.static('./assets'));
app.use(express.static('./public'));
