import { sanitizeFilter } from "mongoose";

const fetch = require("node-fetch-commonjs");
const mongoose = require('mongoose').mongoose;
const ejs = require('ejs').ejs;

const blogSchema = new mongoose.Schema({
  uri: String,
  title: String,
  subtitle: String,
  createdDate: String,
  updatedDate: String,
  content: String
});

const Blog = mongoose.model('Blog', blogSchema);

//API Routes ------------------------------------------------
export function blogAPI_get(req, res) {
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
  //Validate blog post ------------------------------------------------
  const validateBlogPost = () => {
    //Does contain URI?
    if (req.body.uri == null) { return { failedValidation: true, message: uriEmptyMsg }; }

    //Does post already exist?
    let postCount = Blog.find({ uri: req.body.uri }).countDocuments();
    if (postCount > 0) { return { failedValidation: true, message: postExistsMsg }; }

    //Extra checks
    if (req.body.uri.length > 50) { return { failedValidation: true, message: uriTooLongMsg }; }
    else if (req.body.uri.length < 3) { return { failedValidation: true, message: uriTooShortMsg }; } 
    else if (req.body.title == null) { return { failedValidation: true, message: titleEmptyMsg }; }
    else if (req.body.content == null) { return { failedValidation: true, message: contentEmptyMsg }; }

    return { failedValidation: false };
  }

  if (validateBlogPost().failedValidation) {
    res.send(validateBlogPost().message);
    return;
  }

  //Construct blog object ---------------------------------------------
  const uri: string = req.body.uri
  const title: string = req.body.title;
  const subtitle: string = req.body.subtitle;
  const createdDate: string = new Date().toISOString();
  const content: string = req.body.content;

  const blog = new Blog({
    uri: uri,
    title: title,
    subtitle: subtitle,
    createdDate: createdDate,
    updatedDate: createdDate,
    content: content,
  });

  //Save blog object --------------------------------------------------
  blog.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully added a new blog post. ' + blog);
    }
  });
}

export async function blogAPI_update(req, res) {
  const uri: string = req.body.uri;
  const title: string = req.body.title;
  const subtitle: string = req.body.subtitle;
  const updatedDate: string = new Date().toISOString();
  const content: string = req.body.content;

  const filter = { uri: req.params.blogURI };
  let update = { uri: uri, title: title, subtitle: subtitle, updatedDate: updatedDate, content: content }

  //Remove null values -----------------------------------------------
  for (let i = 0; i < Object.keys(update).length; i++) {
    if (update[Object.keys(update)[i]] == null || update[Object.keys(update)[i]] == "") {
      delete update[Object.keys(update)[i]];
    }
  }

  //Validate updated blog post ---------------------------------------
  const validateBlogPost = () => {
    if (req.body.uri == req.params.blogURI
      || req.body.uri == null
      || req.body.uri == "") {
      delete update.uri;
    }
    
    //Does post already exist?
    let postCount = Blog.find({ uri: req.body.uri }).countDocuments();
    if (postCount > 0) { return { failedValidation: true, message: postExistsMsg }; }
    
    //Extra checks
    if (req.body.uri.length > 50) { return { failedValidation: true, message: uriTooLongMsg }; }
    else if (req.body.uri.length < 3) { return { failedValidation: true, message: uriTooShortMsg }; } 
    else if (req.body.title == null) { return { failedValidation: true, message: titleEmptyMsg }; }
    else if (req.body.content == null) { return { failedValidation: true, message: contentEmptyMsg }; }

    return { failedValidation: false };
  }

  if (validateBlogPost().failedValidation) {
    res.send(validateBlogPost().message);
    return;
  }

  Blog.findOneAndUpdate(filter, update, { new: true }, (err, blog) => {
    if (err) {
      res.send(err);
    } else {
      res.send(blog);
    }
  });
}

export function blogAPI_delete(req, res) {
  Blog.findByIdAndDelete(req.params.blogURI, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully deleted the blog post: ' + req.params.blogID);
    }
  });
}

//Routes ------------------------------------------------
export async function blog_getURI(req, res) {
  const blogId = req.params.blogURI;

  const response = await fetch('http://localhost:62264/api/blog/' + blogId);

  if (response.status == 200) {
    const blogData = await response.json();
  
    const blogPage = await res.render('post', { blogData }, (err, html) => {
      if (err) { return console.log(err); }
  
      res.send(html);
    });
  } else {
    res.status(response.status).send("404");
  }
}

//Helper functions ---------------------------------------
const uriEmptyMsg = "URI is empty";
const postExistsMsg = "Post already exists";
const uriTooLongMsg = "URI is too long";
const uriTooShortMsg = "URI is too short";
const titleEmptyMsg = "Title is empty";
const contentEmptyMsg = "Content is empty";