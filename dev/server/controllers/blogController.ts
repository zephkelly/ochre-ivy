require('dotenv').config()
const fetch = require("node-fetch-commonjs");
const mongoose = require('mongoose').mongoose;

// Model ----------------------------------------------------
const blogSchema = new mongoose.Schema({
  uri: String,
  title: String,
  subtitle: String,
  createdDate: String,
  updatedDate: String,
  tags: Array,
  content: Object
});

const Blog = mongoose.model('Blog', blogSchema);

//API Routes ------------------------------------------------
export function blogAPI_get(req, res) {
  if (req.query?.tag != null) {
    if (req.query?.display == 'true') {
      Blog.find({ tags: { $in: [req.query.tag] } }, (err, blogs) => {
        if (err) { return console.log(err); }

        let blogList = [];

        for (let i = 0; i < blogs.length; i++) {
          blogList.push({
            uri: blogs[i].uri,
            title: blogs[i].title,
            subtitle: blogs[i].subtitle,
            createdDate: blogs[i].createdDate,
            updatedDate: blogs[i].updatedDate,
            tags: blogs[i].tags,
          });
        }

        res.send(blogList);
      });
      return;

    } else {
      Blog.find({ tags: { $in: [req.query.tag] } }, (err, blogs) => {
        if (err) { return console.log(err); }

        res.send(blogs);
      });
      return;
    }
  }

  if (req.query?.searchTitle != null) {
    Blog.find({ title: req.query.searchTitle }, (err, blogs) => {
      if (err) { return console.log(err); }
      
      let blogList = [];

      for (let i = 0; i < blogs.length; i++) {
        blogList.push({
          uri: blogs[i].uri,
          title: blogs[i].title,
          subtitle: blogs[i].subtitle,
          createdDate: blogs[i].createdDate,
          updatedDate: blogs[i].updatedDate,
          tags: blogs[i].tags,
        });
      }

      res.send(blogList);
    });
    return;
  }

  if (req.query?.all == true) {
    if (req.query?.display == true) {
      Blog.find({}, (err, blogs) => {
        if (err) { return console.log(err); }
        
        let blogList = [];

        for (let i = 0; i < blogs.length; i++) {
          blogList.push({
            uri: blogs[i].uri,
            title: blogs[i].title,
            subtitle: blogs[i].subtitle,
            createdDate: blogs[i].createdDate,
            updatedDate: blogs[i].updatedDate,
            tags: blogs[i].tags,
          });
        }

        res.send(blogList);
      });
      return;
    } else {
      Blog.find({}, (err, blogs) => {
        if (err) { return console.log(err); }

        res.send(blogs);
      });
      return;
    }
  }

  if (req.query?.count == true) {
    Blog.countDocuments({}, (err, count) => {
      if (err) { return console.log(err); }

      res.send({ count: count });
    });
    return;
  }

  if (req.query?.display == 'true') {
    Blog.find({}, (err, blogs) => {
      if (err) { return console.log(err); }
      
      let blogList = [];

      for (let i = 0; i < blogs.length; i++) {
        blogList.push({
          uri: blogs[i].uri,
          title: blogs[i].title,
          subtitle: blogs[i].subtitle,
          createdDate: blogs[i].createdDate,
          updatedDate: blogs[i].updatedDate,
          tags: blogs[i].tags,
        });
      }

      res.send(blogList);
    });
    return;
  }

  Blog.find({}, (err, blogs) => {
    if (err) { return console.log(err); }

    res.send(blogs);
  });
}

export function blogAPI_getURI(req, res) {
  Blog.find({ uri: req.params.blogURI }, (err, blog) => {
    if (err) {
      console.log("500")
      return res.send("500");
    }

    if (blog.length == 0) {
      console.log("404 in api")
      return res.status(404).send("404");
    }

    console.log("sending blog...");
    return res.status(200).send(blog[0]);
  });
}

export async function blogAPI_post(req, res) {
  
  function validateData() {
    //Does contain URI?
    if (req.body.uri == null || req.body.uri == '') {
      return { status: 400, message: uriEmptyMsg };
    }
    else if (req.body.uri.length > 50) {
      return { status: 400, message: uriTooLongMsg };
    }
    else if (req.body.uri.length < 3) {
      return { status: 400, message: uriTooShortMsg };
    }
    else if (req.body.title == null || req.body.title == '') {
      return { status: 400, message: titleEmptyMsg };
    }
    else if (req.body.content == null || req.body.content == '') {
      return { status: 400, message: contentEmptyMsg };
    }

    return { status: 200, message: '' };
  }

  const validated = validateData();
  
  if (validated.status === 200) {
    Blog.countDocuments({ uri: req.body.uri }, (err, count) => {
      if (err) { return console.log(err); }

      if (count > 0) {
        return res.status(400).send(postExistsMsg);
      }
      else {
        let createdDate = (req.body.date == null || req.body.date == '')
          ? new Date().toISOString()
          : new Date(req.body.date).toISOString();

        const blog = new Blog({
          uri: req.body.uri,
          title: req.body.title,
          subtitle: req.body.subtitle,
          createdDate: createdDate,
          updatedDate: createdDate,
          tags: req.body.tags,
          content: req.body.content
        });

        blog.save((err, blog) => {
          if (err) { return console.log(err); }

          res.status(200).send("Blog post created");
        });
      }
    });
  }
  else {
    res.status(validated.status).send(validated.message);
  }
}

export async function blogAPI_update(req, res) {
  const uri: string = req.body.uri;
  const title: string = req.body.title;
  const subtitle: string = req.body.subtitle;
  const createdDate: string = req.body.date;
  const updatedDate: string = new Date().toISOString();
  const tags: Array<string> = req.body.tags;
  const content: string = req.body.content;

  const filter = { uri: req.params.blogURI };
  let update = { uri: uri, title: title, subtitle: subtitle, createdDate: createdDate, updatedDate: updatedDate, tags: tags, content: content }

  //Remove null or empty values
  for (let i = 0; i < Object.keys(update).length; i++) {
    if (update[Object.keys(update)[i]] == null || update[Object.keys(update)[i]] == "") {
      delete update[Object.keys(update)[i]];
    }
  }

  //If the uri is the same, ignore
  if (update.uri == req.params.blogURI) {
    delete update.uri;
  }

  if (update.createdDate != null) {
    update.createdDate = new Date(update.createdDate).toISOString();
  }
  
  const validateBlogPost = async () => {
    //Does post already exist?
    let postCount = await Blog.find({ uri: req.body.uri }).countDocuments();
    if (postCount > 0) { return { failedValidation: true, message: postExistsMsg }; }
    
    //Extra checks
    if (req.body.uri != null) {
      if (req.body.uri.length > 50) { return { failedValidation: true, message: uriTooLongMsg }; }
      if (req.body.uri.length < 3) { return { failedValidation: true, message: uriTooShortMsg }; }
    }

    return { failedValidation: false };
  }

  //If validation fails, bad request. Send error message
  const validationStatus = await validateBlogPost();

  if (validationStatus.failedValidation) {
    res.status(400).send("Bad request: " + validationStatus.message);
    return;
  }

  Blog.findOneAndUpdate(filter, update, { new: true }, (err, blog) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(blog);
    }
  });
}

export async function blogAPI_delete(req, res) {
  
  Blog.deleteOne({ uri: req.params.blogURI }, async (err) => {
    try {
      res.status(200).send("Successfully deleted blog post");
    } catch (error) {
      res.send(error);
    }
  });
}

export function blogAPI_imageUpload(req, res) {
  const { image } = req.files;

  const imageData = {
    success: 0,
    file: {
      url: ''
    }
  }

  if (!image) {
    return res.status(400).send(JSON.stringify(imageData));
  }
  
  image.mv(__dirname + '/../../public/uploaded-images/' + image.name);

  imageData.success = 1;
  imageData.file.url = '/uploaded-images/' + image.name;

  res.status(200).send(JSON.stringify(imageData));
}

//Routes ------------------------------------------------
export async function blog_homePage(req, res) {
  const featuredBlog = { title: 'Featured Blog', subtitle: 'A blog about stuff', coverPath: '../blog-images/martini.png'}

  res.render('blog', { featuredBlog }, (err, html) => {
    if (err) { return console.log(err); }

    res.status(200).send(html);
    return
  });
}

export async function blog_getURI(req, res) {
  const blogId = req.params.blogURI;

  const response = await fetch('http://localhost:62264/api/blog/' + blogId);

  if (response.status == 200) {
    const blogData = await response.json();
  
    const blogPage = await res.render('post', { blogData }, (err, html) => {
      if (err) { return console.log(err); }
  
      res.status(200).send(html);
      return
    });
  } else if (response.status == 404) {
    res.status(404).send("Blog post not found");
    return;
  } else {
    res.status(response.status).send();
    return;
  }
}

//Helper functions ---------------------------------------
const uriEmptyMsg = "URI is empty";
const postExistsMsg = "Post with that URI already exists";
const uriTooLongMsg = "URI is too long";
const uriTooShortMsg = "URI is too short";
const titleEmptyMsg = "Title is empty";
const contentEmptyMsg = "Content is empty";