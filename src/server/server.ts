const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const PORT = 62264;

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./'));

//Database
mongoose.connect('mongodb://localhost:27017/ochreIvy', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //Only make connection after database connection is established
    app.listen(PORT, () => { console.log('Listening on port ' + PORT); });
  })
  .catch((err) => console.log(err));

//Routes
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.use(authRoutes);
app.use(blogRoutes);