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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blog_getURI = exports.blog_homePage = exports.blogAPI_imageUpload = exports.blogAPI_delete = exports.blogAPI_update = exports.blogAPI_post = exports.blogAPI_getURI = exports.blogAPI_get = void 0;
require('dotenv').config();
var fetch = require("node-fetch-commonjs");
var mongoose = require('mongoose').mongoose;
// Model ----------------------------------------------------
var blogSchema = new mongoose.Schema({
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
var Blog = mongoose.model('Blog', blogSchema);
//API Routes ------------------------------------------------
function blogAPI_get(req, res) {
    var blogList = [];
    var queryDisplay = req.query.display;
    var queryPage = req.query.page;
    var queryLimit = req.query.limit;
    var page = parseInt(req.query.page) || 1;
    if (queryPage) {
        if (isNaN(page) || page < 1) {
            res.status(400).send('Invalid page number');
            return;
        }
    }
    var limit = parseInt(req.query.limit) || 10;
    if (queryLimit) {
        if (isNaN(limit) || limit < 1) {
            res.status(400).send('Invalid limit number');
            return;
        }
    }
    var skip = (page - 1) * limit;
    if (req.query.tag) {
        if (queryDisplay) {
            if (req.query.tag == 'featured') {
                limit = 3;
            }
            Blog.find({ tags: { $in: [req.query.tag] } }).sort({ createdDate: -1 }).skip(skip).limit(limit).exec(function (err, blogs) {
                if (err) {
                    return console.log(err);
                }
                pushToBlogList(blogs);
                res.send(blogList);
            });
        }
        else {
            Blog.find({ tags: { $in: [req.query.tag] } }).sort({ createdDate: -1 }).exec(function (err, blogs) {
                if (err) {
                    return console.log(err);
                }
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
            ]).exec(function (err, blogs) {
                if (err) {
                    return console.log(err);
                }
                pushToBlogList(blogs);
                res.send(blogList);
            });
        }
        else {
            Blog.find({ title: { $search: req.query.search } }).sort({ createdDate: -1 }).exec(function (err, blogs) {
                if (err) {
                    return console.log(err);
                }
                pushToBlogList(blogs);
                res.send(blogList);
            });
        }
        return;
    }
    if (queryDisplay) {
        if (req.query.alphabetical) {
            Blog.find({}).sort({ title: 1 }).skip(skip).limit(limit).exec(function (err, blogs) {
                if (err) {
                    return console.log(err);
                }
                pushToBlogList(blogs);
                res.send(blogList);
            });
            return;
        }
        //check if oldest query
        if (req.query.oldest) {
            Blog.find({}).sort({ createdDate: 1 }).skip(skip).limit(limit).exec(function (err, blogs) {
                if (err) {
                    return console.log(err);
                }
                pushToBlogList(blogs);
                res.send(blogList);
            });
            return;
        }
        //check if recent query
        if (req.query.recent) {
            Blog.find({}).sort({ createdDate: -1 }).skip(skip).limit(limit).exec(function (err, blogs) {
                if (err) {
                    return console.log(err);
                }
                pushToBlogList(blogs);
                res.send(blogList);
            });
            return;
        }
        Blog.find({}).skip(skip).limit(limit).exec(function (err, blogs) {
            if (err) {
                return console.log(err);
            }
            pushToBlogList(blogs);
            res.send(blogList);
        });
        return;
    }
    Blog.find({}, function (err, blogs) {
        if (err) {
            return console.log(err);
        }
        pushToBlogList(blogs, false);
        res.send(blogList);
    });
    function pushToBlogList(blogs, display) {
        if (display === void 0) { display = true; }
        for (var i = 0; i < blogs.length; i++) {
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
    Blog.find({ uri: req.params.blogURI }, function (err, blog) {
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
    return __awaiter(this, void 0, void 0, function () {
        var validated, blog;
        return __generator(this, function (_a) {
            validated = validateBlogData(req.body);
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
                blog = validated.cleanedValidatedBlog;
                blog.save(function (err, blog) {
                    if (err) {
                        return console.log(err);
                    }
                    res.status(200).send("Blog post created");
                });
            }
            else {
                res.status(validated.status).send(validated.message);
            }
            return [2 /*return*/];
        });
    });
}
exports.blogAPI_post = blogAPI_post;
function blogAPI_update(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var uri, title, subtitle, createdDate, updatedDate, tags, content, jsonContent, coverImage, description, filter, update, i, validateBlogPost, validationStatus;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uri = req.body.uri;
                    title = req.body.title;
                    subtitle = req.body.subtitle;
                    createdDate = req.body.date;
                    updatedDate = new Date().toISOString();
                    tags = req.body.tags;
                    content = req.body.content;
                    jsonContent = JSON.parse(content);
                    coverImage = null;
                    description = null;
                    jsonContent.blocks.map(function (block) {
                        if (block.type == 'image') {
                            coverImage = block.data.file.url;
                            return;
                        }
                    });
                    jsonContent.blocks.map(function (block) {
                        if (block.type == 'paragraph') {
                            description = block.data.text;
                            return;
                        }
                    });
                    filter = { uri: req.params.blogURI };
                    update = { uri: uri, title: title, subtitle: subtitle, description: description, createdDate: createdDate, updatedDate: updatedDate, cover: coverImage, tags: tags, content: content };
                    //Remove null or empty values
                    for (i = 0; i < Object.keys(update).length; i++) {
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
                    validateBlogPost = function () { return __awaiter(_this, void 0, void 0, function () {
                        var postCount;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Blog.find({ uri: req.body.uri }).countDocuments()];
                                case 1:
                                    postCount = _a.sent();
                                    if (postCount > 0) {
                                        return [2 /*return*/, { failedValidation: true, message: postExistsMsg }];
                                    }
                                    if (update.cover == null || update.cover == "") {
                                        return [2 /*return*/, { failedValidation: true, message: coverEmptyMsg, status: 400 }];
                                    }
                                    if (update.description == null || update.description == "") {
                                        return [2 /*return*/, { failedValidation: true, message: descriptionEmptyMsg, status: 400 }];
                                    }
                                    //Standard checks
                                    return [2 /*return*/, validateBlogData(req.body)];
                            }
                        });
                    }); };
                    return [4 /*yield*/, validateBlogPost()];
                case 1:
                    validationStatus = _a.sent();
                    if (validationStatus.failedValidation) {
                        res.status(400).send("Bad request: " + validationStatus.message);
                        return [2 /*return*/];
                    }
                    Blog.findOneAndUpdate(filter, update, { new: true }, function (err, blog) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.status(200).send(blog);
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.blogAPI_update = blogAPI_update;
function blogAPI_delete(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            Blog.deleteOne({ uri: req.params.blogURI }, function (err) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (err) {
                        res.status(500).send("Error deleting post");
                        return [2 /*return*/];
                    }
                    res.status(200).send("Post deleted");
                    return [2 /*return*/];
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.blogAPI_delete = blogAPI_delete;
function blogAPI_imageUpload(req, res) {
    var image = req.files.image;
    var imageData = {
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
    return __awaiter(this, void 0, void 0, function () {
        var featuredResponse, recipesResponse, recentResponse, allResponse, featuredBlogs, recipesBlogs, recentBlogs, allBlogs, adminData, blogHome;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:62264/api/blog?display=true' + '&tag=featured')];
                case 1:
                    featuredResponse = _b.sent();
                    return [4 /*yield*/, fetch('http://localhost:62264/api/blog?display=true' + '&tag=recipe')];
                case 2:
                    recipesResponse = _b.sent();
                    return [4 /*yield*/, fetch('http://localhost:62264/api/blog?display=true' + '&recent')];
                case 3:
                    recentResponse = _b.sent();
                    return [4 /*yield*/, fetch('http://localhost:62264/api/blog?display=true' + '&page=1')];
                case 4:
                    allResponse = _b.sent();
                    featuredBlogs = null;
                    if (!(featuredResponse.status == 200)) return [3 /*break*/, 6];
                    return [4 /*yield*/, featuredResponse.json()];
                case 5:
                    featuredBlogs = _b.sent();
                    _b.label = 6;
                case 6:
                    recipesBlogs = null;
                    if (!(recipesResponse.status == 200)) return [3 /*break*/, 8];
                    return [4 /*yield*/, recipesResponse.json()];
                case 7:
                    recipesBlogs = _b.sent();
                    _b.label = 8;
                case 8:
                    recentBlogs = null;
                    if (!(recentResponse.status == 200)) return [3 /*break*/, 10];
                    return [4 /*yield*/, recentResponse.json()];
                case 9:
                    recentBlogs = _b.sent();
                    _b.label = 10;
                case 10:
                    allBlogs = null;
                    if (!(allResponse.status == 200)) return [3 /*break*/, 12];
                    return [4 /*yield*/, allResponse.json()];
                case 11:
                    allBlogs = _b.sent();
                    _b.label = 12;
                case 12:
                    adminData = { notification: false };
                    if (req.session.userid != null) {
                        if (req.session.roles == 'admin') {
                            if (((_a = req.query) === null || _a === void 0 ? void 0 : _a.deleted) == 'true')
                                adminData.notification = true;
                        }
                    }
                    return [4 /*yield*/, res.render('blog-home', { adminData: adminData, featuredBlogs: featuredBlogs, recipesBlogs: recipesBlogs, recentBlogs: recentBlogs, allBlogs: allBlogs }, function (err, html) {
                            if (err) {
                                return console.log(err);
                            }
                            res.status(200).send(html);
                            return;
                        })];
                case 13:
                    blogHome = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.blog_homePage = blog_homePage;
function blog_getURI(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var blogId, response, blogData, adminControls, blogPage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blogId = req.params.blogURI;
                    return [4 /*yield*/, fetch('http://localhost:62264/api/blog/' + blogId)];
                case 1:
                    response = _a.sent();
                    if (!(response.status == 200)) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 2:
                    blogData = _a.sent();
                    adminControls = false;
                    if (req.session.userid != null) {
                        if (req.session.roles == 'admin') {
                            adminControls = true;
                        }
                    }
                    return [4 /*yield*/, res.render('blog-post', { blogData: blogData, adminControls: adminControls }, function (err, html) {
                            if (err) {
                                return console.log(err);
                            }
                            res.status(200).send(html);
                            return;
                        })];
                case 3:
                    blogPage = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    if (response.status == 404) {
                        res.status(404).send("Blog post not found");
                        return [2 /*return*/];
                    }
                    else {
                        res.status(response.status).send();
                        return [2 /*return*/];
                    }
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.blog_getURI = blog_getURI;
//Helper functions ---------------------------------------
function validateBlogData(body) {
    var createdDate = (body.date == null || body.date == '')
        ? new Date().toISOString()
        : new Date(body.date).toISOString();
    var blog = new Blog({
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
    blog.content.blocks.forEach(function (block) {
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
            block.data.items.forEach(function (item) {
                item = cleanContent(item);
            });
        }
    });
    return { failedValidation: false, message: "", status: 200, cleanedValidatedBlog: blog };
}
//clean content functino
function cleanContent(content) {
    var cleanContent = content;
    cleanContent = cleanContent.replace(/&lt;.*?&gt;/g, '');
    cleanContent = cleanContent.replace(/&lt;script.*?;.*?&lt;\/script&gt;/g, '');
    cleanContent = cleanContent.replace(/&lt;script.*?&lt;\/script&gt;/g, '');
    cleanContent = cleanContent.replace(/&lt;script.*?&gt;/g, '');
    cleanContent = cleanContent.replace(/<script>.*<\/script>/g, '');
    cleanContent = cleanContent.replace(/<br>/g, '');
    cleanContent = cleanContent.replace(/&nbsp;/g, ' ');
    return cleanContent;
}
var uriEmptyMsg = "URI is empty";
var postExistsMsg = "Post with that URI already exists";
var uriTooLongMsg = "URI is too long";
var uriTooShortMsg = "URI is too short";
var titleEmptyMsg = "Title is empty";
var tagsEmptyMsg = "Post has no tags";
var tagsTooManyMsg = "Post can only have 5 tags";
var coverEmptyMsg = "Post contains no image for cover photo";
var descriptionEmptyMsg = "Post contains no paragraph for description";
var contentEmptyMsg = "Content is empty";
var noDataMsg = "No data was sent";
