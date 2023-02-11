"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blog_getURI = exports.blog_homePage = exports.blogAPI_imageUpload = exports.blogAPI_delete = exports.blogAPI_update = exports.blogAPI_post = exports.blogAPI_getURI = exports.blogAPI_get = void 0;
require('dotenv').config();
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
function blogAPI_get(req, res) {
    let blogList = [];
    const queryDisplay = req.query.display == 'true';
    const queryPage = req.query.page;
    const queryLimit = req.query.limit;
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
        if (req.query.tag == 'featured') {
            limit = 3;
        }
        Blog.find({ tags: { $in: [req.query.tag] } }).sort({ createdDate: -1 }).skip(skip).limit(limit).exec((err, blogs) => {
            if (err) {
                return console.log(err);
            }
            pushToBlogList(blogs, queryDisplay);
            res.send(blogList);
        });
        return;
    }
    if (req.query.search) {
        //Search for exact match
        Blog.aggregate([{
                $match: {
                    $or: [
                        { title: req.query.search },
                        { subtitle: req.query.search },
                        { tags: req.query.search }
                    ]
                }
            },
            { $skip: skip },
            { $limit: limit }
        ]).exec((err, blogs) => {
            if (err) {
                return console.log(err);
            }
            pushToBlogList(blogs, queryDisplay);
        });
        //Search for partial match
        //Split search into array of words
        let searchArray = req.query.search.split(' ');
        searchArray = searchArray.filter((word) => { return word != ''; });
        let searchRegexArray = [];
        searchArray.forEach((word) => {
            let regex = new RegExp(word, 'i');
            searchRegexArray.push(regex);
        });
        Blog.aggregate([{
                $match: {
                    $or: [
                        { title: { $in: searchRegexArray } },
                        { subtitle: { $in: searchRegexArray } },
                        { tags: { $in: searchRegexArray } }
                    ]
                }
            },
            { $skip: skip },
            { $limit: limit }
        ]).exec((err, blogs) => {
            if (err) {
                return console.log(err);
            }
            pushToBlogList(blogs, queryDisplay);
            //loop over blogList and remove duplicates
            for (let i = 0; i < blogList.length; i++) {
                for (let j = i + 1; j < blogList.length; j++) {
                    if (blogList[i].uri == blogList[j].uri) {
                        blogList.splice(j, 1);
                        //decrement j to account for removed element
                        j--;
                    }
                }
            }
            res.send(blogList);
        });
        return;
    }
    if (req.query.alphabetical) {
        Blog.find({}).sort({ title: 1 }).skip(skip).limit(limit).exec((err, blogs) => {
            if (err) {
                return console.log(err);
            }
            pushToBlogList(blogs, queryDisplay);
            res.send(blogList);
        });
        return;
    }
    if (req.query.oldest) {
        Blog.find({}).sort({ createdDate: 1 }).skip(skip).limit(limit).exec((err, blogs) => {
            if (err) {
                return console.log(err);
            }
            pushToBlogList(blogs, queryDisplay);
            res.send(blogList);
        });
        return;
    }
    if (req.query.recent) {
        Blog.find({}).sort({ createdDate: -1 }).skip(skip).limit(limit).exec((err, blogs) => {
            if (err) {
                return console.log(err);
            }
            pushToBlogList(blogs, queryDisplay);
            res.send(blogList);
        });
        return;
    }
    Blog.find({}).skip(skip).limit(limit).exec((err, blogs) => {
        if (err) {
            return console.log(err);
        }
        pushToBlogList(blogs, queryDisplay);
        res.send(blogList);
    });
    function pushToBlogList(blogs, display = true) {
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
exports.blogAPI_get = blogAPI_get;
function blogAPI_getURI(req, res) {
    Blog.find({ uri: req.params.blogURI }, (err, blog) => {
        if (err) {
            console.log("500");
            return res.send("500");
        }
        if (blog.length == 0) {
            console.log("404 in api");
            return res.status(404).send("404");
        }
        return res.status(200).send(blog[0]);
    });
}
exports.blogAPI_getURI = blogAPI_getURI;
function blogAPI_post(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            let blog = validated.cleanedValidatedBlog;
            blog.save((err, blog) => {
                if (err) {
                    return console.log(err);
                }
                res.status(200).send("Blog post created");
            });
        }
        else {
            res.status(validated.status).send(validated.message);
        }
    });
}
exports.blogAPI_post = blogAPI_post;
function blogAPI_update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = req.body.uri;
        const title = req.body.title;
        const subtitle = req.body.subtitle;
        const createdDate = req.body.date;
        const updatedDate = new Date().toISOString();
        const tags = req.body.tags;
        const content = req.body.content;
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
        let update = { uri: uri, title: title, subtitle: subtitle, description: description, createdDate: createdDate, updatedDate: updatedDate, cover: coverImage, tags: tags, content: content };
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
        const validateBlogPost = () => __awaiter(this, void 0, void 0, function* () {
            //Does post already exist?
            let postCount = yield Blog.find({ uri: req.body.uri }).countDocuments();
            if (postCount > 0) {
                return { failedValidation: true, message: postExistsMsg };
            }
            if (update.cover == null || update.cover == "") {
                return { failedValidation: true, message: coverEmptyMsg, status: 400 };
            }
            if (update.description == null || update.description == "") {
                return { failedValidation: true, message: descriptionEmptyMsg, status: 400 };
            }
            //Standard checks
            return validateBlogData(req.body);
        });
        //If validation fails, bad request. Send error message
        const validationStatus = yield validateBlogPost();
        if (validationStatus.failedValidation) {
            res.status(400).send("Bad request: " + validationStatus.message);
            return;
        }
        Blog.findOneAndUpdate(filter, update, { new: true }, (err, blog) => {
            if (err) {
                res.send(err);
            }
            else {
                res.status(200).send(blog);
            }
        });
    });
}
exports.blogAPI_update = blogAPI_update;
function blogAPI_delete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        Blog.deleteOne({ uri: req.params.blogURI }, (err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                res.status(500).send("Error deleting post");
                return;
            }
            res.status(200).send("Post deleted");
        }));
    });
}
exports.blogAPI_delete = blogAPI_delete;
function blogAPI_imageUpload(req, res) {
    const { image } = req.files;
    const imageData = {
        success: 0,
        file: {
            url: ''
        }
    };
    if (!image) {
        return res.status(400).send(JSON.stringify(imageData));
    }
    image.mv(__dirname + '/../../public/uploaded-images/' + image.name);
    imageData.success = 1;
    imageData.file.url = '/uploaded-images/' + image.name;
    res.status(200).send(JSON.stringify(imageData));
}
exports.blogAPI_imageUpload = blogAPI_imageUpload;
//Routes ------------------------------------------------
function blog_homePage(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const featuredResponse = yield fetch('http://localhost:62264/api/blog?display=true' + '&tag=featured');
        const recipesResponse = yield fetch('http://localhost:62264/api/blog?display=true' + '&tag=recipe');
        const recentResponse = yield fetch('http://localhost:62264/api/blog?display=true' + '&recent');
        const allResponse = yield fetch('http://localhost:62264/api/blog?display=true' + '&page=1');
        let featuredBlogs = null;
        if (featuredResponse.status == 200) {
            featuredBlogs = yield featuredResponse.json();
        }
        let recipesBlogs = null;
        if (recipesResponse.status == 200) {
            recipesBlogs = yield recipesResponse.json();
        }
        let recentBlogs = null;
        if (recentResponse.status == 200) {
            recentBlogs = yield recentResponse.json();
        }
        let allBlogs = null;
        if (allResponse.status == 200) {
            allBlogs = yield allResponse.json();
        }
        //create object to store admin controls
        const adminData = { notification: false };
        if (req.session.userid != null) {
            if (req.session.roles == 'admin') {
                if (((_a = req.query) === null || _a === void 0 ? void 0 : _a.deleted) == 'true')
                    adminData.notification = true;
            }
        }
        const blogHome = yield res.render('blog-home', { adminData, featuredBlogs, recipesBlogs, recentBlogs, allBlogs }, (err, html) => {
            if (err) {
                return console.log(err);
            }
            res.status(200).send(html);
            return;
        });
    });
}
exports.blog_homePage = blog_homePage;
function blog_getURI(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const blogId = req.params.blogURI;
        const response = yield fetch('http://localhost:62264/api/blog/' + blogId);
        if (response.status == 200) {
            const blogData = yield response.json();
            let adminControls = false;
            if (req.session.userid != null) {
                if (req.session.roles == 'admin') {
                    adminControls = true;
                }
            }
            const blogPage = yield res.render('blog-post', { blogData, adminControls }, (err, html) => {
                if (err) {
                    return console.log(err);
                }
                res.status(200).send(html);
                return;
            });
        }
        else if (response.status == 404) {
            res.status(404).send("Blog post not found");
            return;
        }
        else {
            res.status(response.status).send();
            return;
        }
    });
}
exports.blog_getURI = blog_getURI;
//Helper functions ---------------------------------------
function validateBlogData(body) {
    let createdDate = (body.date == null || body.date == '')
        ? new Date().toISOString()
        : new Date(body.date).toISOString();
    const blog = new Blog({
        uri: body.uri,
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        createdDate: createdDate,
        updatedDate: createdDate,
        cover: body.cover,
        tags: body.tags,
        content: body.content,
    });
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
    blog.uri = cleanContent(blog.uri);
    blog.title = cleanContent(blog.title);
    blog.subtitle = cleanContent(blog.subtitle);
    blog.description = cleanContent(blog.description);
    blog.content.blocks.forEach(block => {
        if (block.type == 'paragraph') {
            block.data.text = cleanContent(block.data.text);
        }
        if (block.type == 'quote') {
            block.data.text = cleanContent(block.data.text);
        }
        if (block.type == 'header') {
            block.data.text = cleanContent(block.data.text);
        }
        if (block.type == 'image') {
            block.data.caption = cleanContent(block.data.caption);
        }
        if (block.type == 'list') {
            block.data.items.forEach(item => {
                item = cleanContent(item);
            });
        }
    });
    return { failedValidation: false, message: "", status: 200, cleanedValidatedBlog: blog };
}
//clean content functino
function cleanContent(content) {
    let cleanContent = content;
    cleanContent = cleanContent.replace(/&lt;.*?&gt;/g, '');
    cleanContent = cleanContent.replace(/&lt;script.*?;.*?&lt;\/script&gt;/g, '');
    cleanContent = cleanContent.replace(/&lt;script.*?&lt;\/script&gt;/g, '');
    cleanContent = cleanContent.replace(/&lt;script.*?&gt;/g, '');
    cleanContent = cleanContent.replace(/<script>.*<\/script>/g, '');
    cleanContent = cleanContent.replace(/<br>/g, '');
    cleanContent = cleanContent.replace(/&nbsp;/g, ' ');
    return cleanContent;
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
