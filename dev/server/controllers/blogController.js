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
    var _a, _b, _c, _d, _e, _f, _g;
    if (((_a = req.query) === null || _a === void 0 ? void 0 : _a.tag) != null) {
        if (((_b = req.query) === null || _b === void 0 ? void 0 : _b.display) == 'true') {
            Blog.find({ tags: { $in: [req.query.tag] } }, function (err, blogs) {
                if (err) {
                    return console.log(err);
                }
                var blogListLength = 0;
                var blogList = [];
                if (req.query.tag == 'featured') {
                    if (blogs.length > 3) {
                        blogListLength = 3;
                    }
                    else {
                        blogListLength = blogs.length;
                    }
                }
                for (var i = 0; i < blogListLength; i++) {
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
                }
                res.send(blogList);
            });
            return;
        }
        else {
            Blog.find({ tags: { $in: [req.query.tag] } }, function (err, blogs) {
                if (err) {
                    return console.log(err);
                }
                res.send(blogs);
            });
            return;
        }
    }
    if (((_c = req.query) === null || _c === void 0 ? void 0 : _c.searchTitle) != null) {
        Blog.find({ title: req.query.searchTitle }, function (err, blogs) {
            if (err) {
                return console.log(err);
            }
            var blogList = [];
            for (var i = 0; i < blogs.length; i++) {
                blogList.push({
                    uri: blogs[i].uri,
                    title: blogs[i].title,
                    subtitle: blogs[i].subtitle,
                    createdDate: blogs[i].createdDate,
                    updatedDate: blogs[i].updatedDate,
                    cover: blogs[i].cover,
                    tags: blogs[i].tags,
                });
            }
            res.send(blogList);
        });
        return;
    }
    if (((_d = req.query) === null || _d === void 0 ? void 0 : _d.all) == true) {
        if (((_e = req.query) === null || _e === void 0 ? void 0 : _e.display) == true) {
            Blog.find({}, function (err, blogs) {
                if (err) {
                    return console.log(err);
                }
                var blogList = [];
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
                }
                res.send(blogList);
            });
            return;
        }
        else {
            Blog.find({}, function (err, blogs) {
                if (err) {
                    return console.log(err);
                }
                res.send(blogs);
            });
            return;
        }
    }
    if (((_f = req.query) === null || _f === void 0 ? void 0 : _f.count) == true) {
        Blog.countDocuments({}, function (err, count) {
            if (err) {
                return console.log(err);
            }
            res.send({ count: count });
        });
        return;
    }
    if (((_g = req.query) === null || _g === void 0 ? void 0 : _g.display) == 'true') {
        Blog.find({}, function (err, blogs) {
            if (err) {
                return console.log(err);
            }
            var blogList = [];
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
            }
            res.send(blogList);
        });
        return;
    }
    Blog.find({}, function (err, blogs) {
        if (err) {
            return console.log(err);
        }
        res.send(blogs);
    });
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
        var validated;
        return __generator(this, function (_a) {
            validated = validateBlogData(req.body);
            if (req.body.cover == null || req.body.cover == "") {
                return [2 /*return*/, { failedValidation: true, message: coverEmptyMsg, status: 400 }];
            }
            else if (req.body.description == null || req.body.description == "") {
                return [2 /*return*/, { failedValidation: true, message: descriptionEmptyMsg, status: 400 }];
            }
            if (validated.status === 200) {
                Blog.countDocuments({ uri: req.body.uri }, function (err, count) {
                    if (err) {
                        return console.log(err);
                    }
                    if (count > 0) {
                        return res.status(400).send(postExistsMsg);
                    }
                    else {
                        var createdDate = (req.body.date == null || req.body.date == '')
                            ? new Date().toISOString()
                            : new Date(req.body.date).toISOString();
                        var blog = new Blog({
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
                        blog.save(function (err, blog) {
                            if (err) {
                                return console.log(err);
                            }
                            res.status(200).send("Blog post created");
                        });
                    }
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
                    try {
                        res.status(200).send("Successfully deleted blog post");
                    }
                    catch (error) {
                        res.send(error);
                    }
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
    return __awaiter(this, void 0, void 0, function () {
        var response, featuredBlogs, blogHome;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:62264/api/blog?display=true' + '&tag=featured')];
                case 1:
                    response = _a.sent();
                    if (!(response.status == 200)) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 2:
                    featuredBlogs = _a.sent();
                    return [4 /*yield*/, res.render('blog-home', { featuredBlogs: featuredBlogs }, function (err, html) {
                            if (err) {
                                return console.log(err);
                            }
                            res.status(200).send(html);
                            return;
                        })];
                case 3:
                    blogHome = _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.blog_homePage = blog_homePage;
function blog_getURI(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var blogId, response, blogData, blogPage;
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
                    return [4 /*yield*/, res.render('blog-post', { blogData: blogData }, function (err, html) {
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
