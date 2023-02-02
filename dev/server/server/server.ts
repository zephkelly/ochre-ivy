require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const MongoStore = require('connect-mongo');

const authRoutes = require('./server/routes/authRoutes');
const blogRoutes = require('./server/routes/blogRoutes');
const adminRoutes = require('./server/routes/adminRoutes');

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

//Routes
app.get('/', (req, res) => {
  if (req.session.userid) {
    const userData = { name: req.session.name }

    if (req.session.roles == 'admin') {
      const siteData = { blogCount: 0, recipeCount: 0 };
    
      res.status(200).render('admin/admin-index', { userData, siteData });
      return;
    } 
    else {
      res.status(200).render('index', { userData });
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