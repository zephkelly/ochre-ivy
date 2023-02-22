require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const multer = require('multer')

//multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploaded-images/');
  },
  filename: function (req, file, cb) {
    let newName = file.originalname.replace(/ /g, '-');
    newName = Date.now() + '-' + newName;

    cb(null, newName);
  },
})

export const upload = multer({ storage: storage })

const authRoutes = require('./server/routes/authRoutes');
const adminRoutes = require('./server/routes/adminRoutes');
const blogRoutes = require('./server/routes/blogRoutes');
const uploadRoutes = require('./server/routes/uploadRoutes');
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

//Database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => { console.log('Listening on port ' + PORT); });

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
  })
  .catch((err) => console.log(err));

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
      
      return res.status(200).render('admin/admin-index', { session, siteData: await getSiteData(), recentBlogs: await getBlogsData(), recipeBlogs: await getRecipesData() });
    } 
  }
  
  return res.status(200).render('index', { session, recentBlogs: await getBlogsData(), recipeBlogs: await getRecipesData() });
  
  //Functions
  async function getBlogsData() {
    const data = await fetch('http://localhost:' + process.env.PORT + '/api/blog?filter=newest&limit=3&display=true');
    const recentBlogs = await data.json();

    return recentBlogs;
  }

  async function getRecipesData() {
    const data = await fetch('http://localhost:' + process.env.PORT + '/api/blog?tag=recipe&limit=5&display=false');
    const recipeBlogs = await data.json();

    return recipeBlogs;
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

  res.status(200).render('about', { session });
});

app.use(authRoutes);
app.use(adminRoutes);
app.use(blogRoutes);
app.use(uploadRoutes);
app.use(analyticsRoutes);

app.use(express.static('./assets'));
app.use(express.static('./public'));