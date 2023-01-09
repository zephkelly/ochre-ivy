const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const PORT = 62264;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./'));

//Database
mongoose.connect('mongodb://localhost:27017/ochre-ivy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const blogSchema = {
  title: String,
  content: String,
};

const Blog = mongoose.model('Blog', blogSchema);

//Middleware
app.use(authRoutes);

//Routes
app.get('/', (req, res) => {
  res.sendFile('index.html');
});


app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});

module.exports = Blog;