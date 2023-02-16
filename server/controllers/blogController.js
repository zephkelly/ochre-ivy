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
const sharp = require('sharp');
const fs = require('fs');
const analyticsModel_1 = require("../models/analyticsModel");
const blogModel_1 = require("../models/blogModel");
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
    if (req.query.count) {
        const countData = { blogCount: null, recipeCount: null };
        blogModel_1.Blog.Model.countDocuments({}, (err, count) => {
            if (err) {
                return console.log(err);
            }
            countData.blogCount = count;
            blogModel_1.Blog.Model.countDocuments({ tags: { $in: ['recipe'] } }, (err, count) => {
                if (err) {
                    return console.log(err);
                }
                countData.recipeCount = count;
                res.status(200).send(countData);
            });
        });
        return;
    }
    if (req.query.tag) {
        if (req.query.tag == 'featured') {
            limit = 3;
            skip = (page - 1) * limit;
        }
        blogModel_1.Blog.Model.find({ tags: { $in: [req.query.tag] } }).sort({ createdDate: -1 }).skip(skip).limit(limit).exec((err, blogs) => {
            if (err) {
                return console.log(err);
            }
            pushToBlogList(blogs, queryDisplay);
            blogList = blogList.sort(() => Math.random() - 0.5);
            res.send(blogList);
        });
        return;
    }
    if (req.query.search) {
        //Search for exact match
        blogModel_1.Blog.Model.aggregate([{
                $match: { $or: [
                        { titleLower: req.query.search.toLowerCase() },
                        { subtitle: req.query.search.toLowerCase() },
                        { tags: req.query.search.toLowerCase() }
                    ] }
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
        let searchArray = req.query.search.split(' ');
        searchArray = searchArray.filter((word) => { return word.toLowerCase() != ''; });
        let searchRegexArray = [];
        searchArray.forEach((word) => {
            let regex = new RegExp(word, 'i');
            searchRegexArray.push(regex);
        });
        blogModel_1.Blog.Model.aggregate([{
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
            for (let i = 0; i < blogList.length; i++) {
                for (let j = i + 1; j < blogList.length; j++) {
                    if (blogList[i].uri == blogList[j].uri) {
                        blogList.splice(j, 1);
                        j--;
                    }
                }
            }
            res.send(blogList);
        });
        return;
    }
    if (req.query.filter && req.query.filter != 'none') {
        switch (req.query.filter) {
            case 'alphabetical':
                blogModel_1.Blog.Model.find({}).sort({ titleLower: 1 }).skip(skip).limit(limit).exec((err, blogs) => {
                    if (err) {
                        return console.log(err);
                    }
                    pushToBlogList(blogs, queryDisplay);
                    res.send(blogList);
                });
                break;
            case 'oldest':
                blogModel_1.Blog.Model.find({}).sort({ createdDate: 1 }).skip(skip).limit(limit).exec((err, blogs) => {
                    if (err) {
                        return console.log(err);
                    }
                    pushToBlogList(blogs, queryDisplay);
                    res.send(blogList);
                });
                break;
            case 'newest' || 'recent' || 'latest':
                blogModel_1.Blog.Model.find({}).sort({ createdDate: -1 }).skip(skip).limit(limit).exec((err, blogs) => {
                    if (err) {
                        return console.log(err);
                    }
                    pushToBlogList(blogs, queryDisplay);
                    res.send(blogList);
                });
                break;
            case 'views':
                blogModel_1.Blog.Model.find({}).sort({ views: -1 }).skip(skip).limit(limit).exec((err, blogs) => {
                    if (err) {
                        return console.log(err);
                    }
                    pushToBlogList(blogs, queryDisplay);
                    res.send(blogList);
                });
                break;
            case 'recipe' || 'recipes':
                blogModel_1.Blog.Model.find({ tags: { $in: ['recipe'] } }).sort({ createdDate: -1 }).skip(skip).limit(limit).exec((err, blogs) => {
                    if (err) {
                        return console.log(err);
                    }
                    pushToBlogList(blogs, queryDisplay);
                    blogList = blogList.sort(() => Math.random() - 0.5);
                    res.send(blogList);
                });
                break;
            default:
                res.status(400).send('Invalid filter');
                return;
        }
        return;
    }
    //Deafult 
    blogModel_1.Blog.Model.find({}).sort({ views: -1 }).skip(skip).limit(3).exec((err, highViewBlogs) => {
        if (err) {
            return console.log(err);
        }
        pushToBlogList(highViewBlogs, queryDisplay);
        blogList = blogList.sort(() => Math.random() - 0.5);
        blogModel_1.Blog.Model.find({}).skip(skip).limit(limit).exec((err, allBlogs) => {
            if (err) {
                return console.log(err);
            }
            allBlogs = allBlogs.sort(() => Math.random() - 0.5);
            // if highViewBlogs doesnt contain allBlog add to blog list
            for (let i = 0; i < allBlogs.length; i++) {
                let found = false;
                for (let j = 0; j < highViewBlogs.length; j++) {
                    if (allBlogs[i].uri == highViewBlogs[j].uri) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    pushToBlogList([allBlogs[i]], queryDisplay);
                }
            }
            if (blogList.length > limit) {
                blogList.splice(limit, blogList.length - limit);
            }
            res.send(blogList);
        });
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
                views: blogs[i].views,
            });
            if (!display) {
                blogList[i].content = blogs[i].content;
            }
        }
    }
}
exports.blogAPI_get = blogAPI_get;
function blogAPI_getURI(req, res) {
    blogModel_1.Blog.Model.find({ uri: req.params.blogURI }, (err, blog) => {
        if (err) {
            console.log("500");
            return res.send("500");
        }
        if (blog.length == 0) {
            console.log("404 in api");
            return res.status(404).send("404");
        }
        blogModel_1.Blog.Model.findOneAndUpdate({ uri: req.params.blogURI }, { $inc: { views: 1 } }, (err, blog) => {
            if (err) {
                return console.log(err);
            }
        });
        analyticsModel_1.Analytics.Model.findOne({}, (err, analytics) => {
            if (err) {
                console.log(err);
            }
            else {
                analytics.blogViews += 1;
                analytics.save();
            }
        });
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
                function blogType() {
                    if (blog.tags.includes("recipe")) {
                        return "recipe";
                    }
                    return "blog";
                }
                //combine above if else into a string which can b interchanged
                analyticsModel_1.Analytics.Model.findOneAndUpdate({ name: (blogType() + "Count") }, { $inc: { count: 1 } }, (err, analytics) => {
                    if (err) {
                        return console.log(err);
                    }
                });
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
        const description = req.body.description;
        const createdDate = req.body.date;
        const updatedDate = new Date().toISOString();
        const tags = req.body.tags;
        const cover = req.body.cover;
        const content = req.body.content;
        const filter = { uri: req.params.blogURI };
        let update = { uri: uri, title: title, subtitle: subtitle, description: description, createdDate: createdDate, updatedDate: updatedDate, cover: cover, tags: tags, content: content };
        //Remove null or empty values
        for (let i = 0; i < Object.keys(update).length; i++) {
            if (update[Object.keys(update)[i]] == null || update[Object.keys(update)[i]] == "") {
                delete update[Object.keys(update)[i]];
            }
        }
        if (update.createdDate != null) {
            update.createdDate = new Date(update.createdDate).toISOString();
        }
        const validateBlogPost = () => __awaiter(this, void 0, void 0, function* () {
            //If the uri is the same, ignore
            if (update.uri == req.params.blogURI) {
                delete update.uri;
            }
            else {
                //Does post already exist?
                let postCount = yield blogModel_1.Blog.Model.find({ uri: req.body.uri }).countDocuments();
                if (postCount > 0) {
                    return { failedValidation: true, message: postExistsMsg };
                }
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
        blogModel_1.Blog.Model.findOneAndUpdate(filter, update, { new: true }, (err, blog) => {
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
        blogModel_1.Blog.Model.deleteOne({ uri: req.params.blogURI }, (err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                res.status(500).send("Error deleting post");
                return;
            }
            analyticsModel_1.Analytics.Model.findOneAndUpdate({ name: "blogCount" }, { $inc: { count: -1 } }, (err, analytics) => {
                if (err) {
                    return console.log(err);
                }
            });
            res.status(200).send("Post deleted");
        }));
    });
}
exports.blogAPI_delete = blogAPI_delete;
function blogAPI_imageUpload(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageData = {
            success: 0,
            file: {
                url: ''
            }
        };
        const { image } = req.files;
        const dirPath = __dirname + '/../../public/uploaded-images/';
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        if (!image) {
            return res.status(400).send(JSON.stringify(imageData));
        }
        yield image.mv(dirPath + image.name);
        let newName = image.name.split('.')[0] + '-' + Date.now() + '.webp';
        newName = newName.replace(/\s/g, '-');
        yield sharp(dirPath + image.name)
            .resize()
            .webp({ quality: 60 })
            .toFile(dirPath + newName);
        fs.unlink(dirPath + image.name, (err) => { if (err) {
            console.log(err);
        } });
        imageData.success = 1;
        imageData.file.url = '/uploaded-images/' + newName;
        res.status(200).send(JSON.stringify(imageData));
    });
}
exports.blogAPI_imageUpload = blogAPI_imageUpload;
//Routes ------------------------------------------------
function blog_homePage(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const fetchURL = 'http://localhost:' + process.env.PORT + '/api/blog?display=true';
        const featuredBlogs = yield getBlogsFromAPI(fetchURL + '&tag=featured');
        const recipesBlogs = yield getBlogsFromAPI(fetchURL + '&tag=recipe');
        const recentBlogs = yield getBlogsFromAPI(fetchURL + '&filter=newest');
        //create object to store admin controls
        const session = { notification: false, admin: false };
        if (req.session.userid != null) {
            if (req.session.roles == 'admin') {
                session.admin = true;
                if (((_a = req.query) === null || _a === void 0 ? void 0 : _a.deleted) == 'true') {
                    session.notification = true;
                }
            }
        }
        const blogHome = yield res.render('blog-home', { session, featuredBlogs, recipesBlogs, recentBlogs }, (err, html) => {
            if (err) {
                return console.log(err);
            }
            res.status(200).send(html);
            return;
        });
        function getBlogsFromAPI(apiURL) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(apiURL);
                if (response.status == 200) {
                    return yield response.json();
                }
            });
        }
    });
}
exports.blog_homePage = blog_homePage;
function blog_getURI(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const blogId = req.params.blogURI;
        const response = yield fetch('http://localhost:' + process.env.PORT + '/api/blog/' + blogId);
        const session = { notification: false, admin: false };
        if (response.status == 200) {
            const blogData = yield response.json();
            if (req.session.userid != null) {
                if (req.session.roles == 'admin') {
                    session.admin = true;
                }
            }
            const blogPage = yield res.render('blog-post', { session, blogData }, (err, html) => {
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
function validateBlogData(body, isUpdate = false) {
    let createdDate = (body.date == null || body.date == '')
        ? new Date().toISOString()
        : new Date(body.date).toISOString();
    const blog = new blogModel_1.Blog.Model({
        uri: body.uri,
        title: body.title,
        titleLower: body.title.toLowerCase(),
        subtitle: body.subtitle,
        description: body.description,
        createdDate: createdDate,
        updatedDate: createdDate,
        cover: body.cover,
        tags: body.tags,
        content: body.content,
        views: (isUpdate) ? body.views : 0,
        comments: (isUpdate) ? body.comments : [],
    });
    if (body.uri == null || body.uri == "")
        return { failedValidation: true, message: uriEmptyMsg, status: 400 };
    else if (body.uri.length > 100)
        return { failedValidation: true, message: uriTooLongMsg, status: 400 };
    else if (body.uri.length < 3)
        return { failedValidation: true, message: uriTooShortMsg, status: 400 };
    else if (body.title == null || body.title == "")
        return { failedValidation: true, message: titleEmptyMsg, status: 400 };
    else if (body.tags == null || body.tags.length == 0)
        return { failedValidation: true, message: tagsEmptyMsg, status: 400 };
    else if (body.tags.length > 8)
        return { failedValidation: true, message: tagsTooManyMsg, status: 400 };
    else if (body.content == null || body.content == "")
        return { failedValidation: true, message: contentEmptyMsg, status: 400 };
    else if (body.cover == null || body.cover == "")
        return { failedValidation: true, message: coverEmptyMsg, status: 400 };
    else if (body.description == null || body.description == "")
        return { failedValidation: true, message: descriptionEmptyMsg, status: 400 };
    blog.uri = cleanContent(blog.uri);
    blog.title = cleanContent(blog.title);
    blog.subtitle = cleanContent(blog.subtitle);
    blog.description = cleanContent(blog.description);
    body.content.blocks.forEach(block => {
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
const tagsTooManyMsg = "Post can only have 8 tags";
const coverEmptyMsg = "Post contains no image for cover photo";
const descriptionEmptyMsg = "Post contains no paragraph for description";
const contentEmptyMsg = "Content is empty";
const noDataMsg = "No data was sent";
