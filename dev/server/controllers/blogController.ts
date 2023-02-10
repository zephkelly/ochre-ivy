require('dotenv').config()
const fetch = require("node-fetch-commonjs");
const mongoose = require('mongoose').mongoose;

// Model ----------------------------------------------------
const blogSchema = new mongoose.Schema({
  uri: String,
  title: String,
  subtitle: String,
  description: String,
  createdDate: String,
  updatedDate: String,
  cover: String,
  tags: Array,
  content: Object
});

const Blog = mongoose.model('Blog', blogSchema);

//API Routes ------------------------------------------------
export function blogAPI_get(req, res) {
  let blogList: any = [];
  
  const queryDisplay: boolean = req.query.display; 
  const queryPage: boolean = req.query.page;
  const queryLimit: boolean = req.query.limit;

  let page = parseInt(req.query.page) || 1;
  if (queryPage) {
    if (isNaN(page) || page < 1) {
      res.status(400).send('Invalid page number');
      return;
    }
  }

  let limit = parseInt(req.query.limit) || 10;
  if (queryLimit) {
    if (isNaN(limit) || limit < 1) {
      res.status(400).send('Invalid limit number');
      return;
    }
  }

  let skip = (page - 1) * limit;

  if (req.query.tag) {
    if (queryDisplay) {
      if (req.query.tag == 'featured') {
        limit = 3;
      }

      Blog.find({ tags: { $in: [req.query.tag] } }).sort({ createdDate: -1 }).skip(skip).limit(limit).exec((err, blogs) => {
        if (err) { return console.log(err); }

        pushToBlogList(blogs);
        res.send(blogList);
      });
    }
    else {
      Blog.find({ tags: { $in: [req.query.tag] } }).sort({ createdDate: -1 }).exec((err, blogs) => {
        if (err) { return console.log(err); }

        pushToBlogList(blogs);
        res.send(blogList);
      });
    }
    return;
  }

  if (req.query.search) {
    if (queryDisplay) {    
      Blog.aggregate([
      { $match: { title: { $regex: req.query.search, $options: 'i' } } },
      { $sort: { createdDate: -1 } },
      { $skip: skip },
      { $limit: limit }
    ]).exec((err, blogs) => {
      if (err) { return console.log(err); }

      pushToBlogList(blogs);
      res.send(blogList);
    });   
    }
    else {
      Blog.find({ title: { $search: req.query.search } }).sort({ createdDate: -1 }).exec((err, blogs) => {
        if (err) { return console.log(err); }

        pushToBlogList(blogs);
        res.send(blogList);
      });
    }
    return;
  }

  if (queryDisplay) {
    if (req.query.alphabetical) {
      Blog.find({}).sort({ title: 1 }).skip(skip).limit(limit).exec((err, blogs) => {
        if (err) { return console.log(err); }

        pushToBlogList(blogs);
        res.send(blogList);
      });
      return;
    }

    //check if oldest query
    if (req.query.oldest) {
      Blog.find({}).sort({ createdDate: 1 }).skip(skip).limit(limit).exec((err, blogs) => {
        if (err) { return console.log(err); }

        pushToBlogList(blogs);
        res.send(blogList);
      });
      return;
    }

    //check if recent query
    if (req.query.recent) {
      Blog.find({}).sort({ createdDate: -1 }).skip(skip).limit(limit).exec((err, blogs) => {
        if (err) { return console.log(err); }

        pushToBlogList(blogs);
        res.send(blogList);
      });
      return;
    }

    Blog.find({}).skip(skip).limit(limit).exec((err, blogs) => {
      if (err) { return console.log(err); }

      pushToBlogList(blogs);
      res.send(blogList);
    });
    return;
  }

  Blog.find({}, (err, blogs) => {
    if (err) { return console.log(err); }

    pushToBlogList(blogs, false);
    res.send(blogList);
  });
  
  function pushToBlogList(blogs: any, display: boolean = true) {
    for (let i = 0; i < blogs.length; i++) {
      blogList.push({
        uri: blogs[i].uri,
        title: blogs[i].title,
        subtitle: blogs[i].subtitle,
        description: blogs[i].description,
        createdDate: blogs[i].createdDate,
        updatedDate: blogs[i].updatedDate,
        cover: blogs[i].cover,
        tags: blogs[i].tags,
      });

      if (!display) {
        blogList[i].content = blogs[i].content;
      }
    }
  }
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

    return res.status(200).send(blog[0]);
  });
}

export async function blogAPI_post(req, res) {

  let validated = validateBlogData(req.body);

  if (req.body == null) {
    validated = { failedValidation: true, message: noDataMsg, status: 400 };
  }
  else if (req.body.cover == null || req.body.cover == "") {
    validated = { failedValidation: true, message: coverEmptyMsg, status: 400 };
  }
  else if (req.body.description == null || req.body.description == "") {
    validated = { failedValidation: true, message: descriptionEmptyMsg, status: 400 };
  }
  
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
          description: req.body.description,
          createdDate: createdDate,
          updatedDate: createdDate,
          cover: req.body.cover,
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

  //turn content into object
  let jsonContent = JSON.parse(content);

  let coverImage = null;
  let description = null;

  jsonContent.blocks.map(block => {
    if (block.type == 'image') {
      coverImage = block.data.file.url;
      return;
    }
  });

  jsonContent.blocks.map(block => {
    if (block.type == 'paragraph') {
      description = block.data.text;
      return;
    }
  });

  const filter = { uri: req.params.blogURI };
  let update = { uri: uri, title: title, subtitle: subtitle, description: description, createdDate: createdDate, updatedDate: updatedDate, cover: coverImage, tags: tags, content: content }

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
    
    if (update.cover == null || update.cover == "") {
      return { failedValidation: true, message: coverEmptyMsg, status: 400 };
    }
    
    if (update.description == null || update.description == "") {
      return { failedValidation: true, message: descriptionEmptyMsg, status: 400 };
    }

    //Standard checks
    return validateBlogData(req.body);
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
    if (err) {
      res.status(500).send("Error deleting post");
      return;
    }

    res.status(200).send("Post deleted");
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
  const featuredResponse = await fetch('http://localhost:62264/api/blog?display=true' + '&tag=featured');
  const recipesResponse = await fetch('http://localhost:62264/api/blog?display=true' + '&tag=recipe');
  const recentResponse = await fetch('http://localhost:62264/api/blog?display=true' + '&recent');
  const allResponse = await fetch('http://localhost:62264/api/blog?display=true' + '&page=1');

  let featuredBlogs = null;
  if (featuredResponse.status == 200) {
    featuredBlogs = await featuredResponse.json();
  }
  
  let recipesBlogs = null;
  if (recipesResponse.status == 200) {
    recipesBlogs = await recipesResponse.json();
  }

  let recentBlogs = null;
  if (recentResponse.status == 200) {
    recentBlogs = await recentResponse.json();
  }

  let allBlogs = null;
  if (allResponse.status == 200) {
    allBlogs = await allResponse.json();
  }

  //create object to store admin controls
  const adminData = { notification: false }
  
  if (req.session.userid != null) {
    if (req.session.roles == 'admin') {

      if (req.query?.deleted == 'true')
      adminData.notification = true;
    }
  }

  const blogHome = await res.render('blog-home', { adminData, featuredBlogs, recipesBlogs, recentBlogs, allBlogs }, (err, html) => {
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

    let adminControls = false;

    if (req.session.userid != null) {
      if (req.session.roles == 'admin') {
        adminControls = true;
      }
    }
  
    const blogPage = await res.render('blog-post', { blogData, adminControls }, (err, html) => {
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
function validateBlogData(body) {
  if (body.uri == null || body.uri == "") {
    return { failedValidation: true, message: uriEmptyMsg, status: 400 };
  }
  else if (body.uri.length > 100) {
    return { failedValidation: true, message: uriTooLongMsg, status: 400 };
  }
  else if (body.uri.length < 3) {
    return { failedValidation: true, message: uriTooShortMsg, status: 400 };
  }
  else if (body.title == null || body.title == "") {
    return { failedValidation: true, message: titleEmptyMsg, status: 400 };
  }
  else if (body.tags == null || body.tags.length == 0) {
    return { failedValidation: true, message: tagsEmptyMsg, status: 400 };
  }
  else if (body.tags.length > 5) {
    return { failedValidation: true, message: tagsTooManyMsg, status: 400 };
  }
  else if (body.content == null || body.content == "") {
    return { failedValidation: true, message: contentEmptyMsg, status: 400 };
  }

  return { failedValidation: false, message: "", status: 200 };
}


const uriEmptyMsg = "URI is empty";
const postExistsMsg = "Post with that URI already exists";
const uriTooLongMsg = "URI is too long";
const uriTooShortMsg = "URI is too short";
const titleEmptyMsg = "Title is empty";
const tagsEmptyMsg = "Post has no tags";
const tagsTooManyMsg = "Post can only have 5 tags";
const coverEmptyMsg = "Post contains no image for cover photo";
const descriptionEmptyMsg = "Post contains no paragraph for description";
const contentEmptyMsg = "Content is empty";
const noDataMsg = "No data was sent";