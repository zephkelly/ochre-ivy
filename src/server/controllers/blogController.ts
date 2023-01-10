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
    if (err) {
      console.log(err);
    }

    res.send('Here are all the blog posts: ' + JSON.stringify(blogs))
  });
}

export function blogAPI_getID(req, res) {
  Blog.findById(req.params.blogID, (err, blog) => {
    if (err) { return console.log(err); }

    res.send('Here is the blog post you requested: ' + blog);
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
export function blog_get(req, res) {
  const homePage = ejs.renderFile('./views/blog.ejs', (err, html) => {

  });
}