require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(express.static('./'));
app.set('view engine', 'ejs');

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
  })
  .catch((err) => console.log(err));

//Routes
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.use(authRoutes);
app.use(blogRoutes);