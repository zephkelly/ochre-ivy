require('dotenv').config()
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
import { Analytics } from './server/models/analyticsModel';

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
  })
  .catch((err) => console.log(err));

// Analytics
Analytics.Model.findOne({}, (err, analytics) => {
  if (err) {
    console.log(err);

  } else {
    if (!analytics) {
      const analytics = new Analytics.Model({
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

function updateAnalytics(req, res, next) {
  Analytics.Model.findOne({}, (err, analytics) => {
    if (err) {
      console.log(err);

    } else {
      analytics.siteHits += 1;
      analytics.save();
    }
  });

  return next();
}

//Routes
app.get('/', updateAnalytics, async (req, res) => {
  const session = { name: null, admin: false, notification: false };
  
  if (req.session.userid) {
    session.name = req.session.name;
    
    if (req.session.roles == 'admin') {
      session.admin = true;

      if (req.query?.loggingIn) {
        session.notification = true;
      }
      
      res.status(200).render('admin/admin-index', { session, siteData: await getSiteData() });
    } 
    return;
  }
  
  res.status(200).render('index', { session, blogData: await getBlogData() })
  
  //Functions
  async function getBlogData() {
    return await fetch('http://localhost:' + process.env.PORT + '/api/blogs?filter=recent&limit=1&display=true')
  }

  async function getSiteData() {
    const siteData = {
      blogCount: null,
      recipeCount: null,
      blogViews: null,
    }

    const counts = await fetch('http://localhost:' + process.env.PORT + '/api/blog?count=true');
    const countsData = await counts.json();

    siteData.blogCount = countsData.blogCount;
    siteData.recipeCount = countsData.recipeCount;

    const views = await fetch('http://localhost:' + process.env.PORT + '/api/analytics');
    const viewsData = await views.json();

    siteData.blogViews = viewsData.blogViews;

    return siteData;
  }
});

app.get('/about', (req, res) => {
  const session = { name: null, admin: false, notification: false };

  if(req.session.userid) {
    session.name = req.session.name;

    if (req.session.roles == 'admin') {
      session.admin = true;
    }
  }

  res.status(200).sendFile(__dirname + '/about.html');
});

app.use(authRoutes);
app.use(blogRoutes);
app.use(adminRoutes);
app.use(analyticsRoutes);

app.use(express.static('./assets'));
app.use(express.static('./public'));