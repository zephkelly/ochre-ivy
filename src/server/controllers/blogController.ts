const model = require('../server');

export function blog_get(req, res) {
  model.Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Here are all the blog posts: ');
      //res.json(blogs);
    }
  });
}

export function blog_getID(req, res) {
  model.Blog.find({ title: req.params.blogTitle },
    (err, blog) => {
      if (err) {
        res.send(err);
      } else {
        //res.send(blog);
        res.send('Here is the blog post you requested: ' + req.params.blogTitle);
      }
    }
  )
}

export function blog_post(req, res) {
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
}