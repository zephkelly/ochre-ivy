const fetch = require("node-fetch-commonjs");
const mongoose = require('mongoose').mongoose;
const ejs = require('ejs').ejs;

const blogSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Blog = mongoose.model('Blog', blogSchema);

//API Routes ------------------------------------------------
export function blogAPI_get(req, res) {
  Blog.find({}, (err, blogs) => {
    if (err) { return console.log(err); }

    res.send(JSON.stringify(blogs))
  });
}

export function blogAPI_getID(req, res) {
  Blog.findById(req.params.blogID, (err, blog) => {
    if (err) { return console.log(err); }

    res.send(blog);
  })
}

export function blogAPI_post(req, res) {
  const title = req.query.title;
  const content = req.query.content;

  const blog = new Blog({
    title: title,
    content: content,
  });

  blog.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully added a new blog post. ' + blog);
    }
  });
}

export function blogAPI_update(req, res) {
  const newTitle = req.query.title;
  const newContent = req.query.content;

  Blog.findByIdAndUpdate(req.params.blogID, { title: newTitle, content: newContent }, (err) => {
    if (err) {
      res.send(err);
    }
    else {
      res.send('Successfully updated the blog post: ' + req.params.blogID);
    }
  });
}

export function blogAPI_delete(req, res) {
  Blog.findByIdAndDelete(req.params.blogID, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully deleted the blog post: ' + req.params.blogID);
    }
  });
}

//Routes ------------------------------------------------
export async function blog_getID(req, res) {
  const blogId = req.params.blogID;

  const response = await fetch('http://localhost:62264/api/blog/' + blogId);
  const blogData = await response.json();

  const blogPage = await res.render('post', { blogData }, (err, html) => {
    if (err) { return console.log(err); }

    res.send(html);
  });
}