import { isAuthenticated } from "./auth";

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

//Routes
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/blog', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Here are all the blog posts: ');
      //res.json(blogs);
    }
  });
});

app.get('/blog/:blogTitle', (req, res) => {
  Blog.find({ title: req.params.blogTitle },
    (err, blog) => {
      if (err) {
        res.send(err);
      } else {
        //res.send(blog);
        res.send('Here is the blog post you requested: ' + req.params.blogTitle);
      }
    })
})

app.post('/blog', isAuthenticated, (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const blog = new Blog({
    title: title,
    content: content,
  });

  blog.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully added a new blog post.');
    }
  });
});

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});