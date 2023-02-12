"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
var Blog;
(function (Blog) {
    Blog.BlogSchema = new mongoose_1.Schema({
        uri: String,
        title: String,
        titleLower: String,
        subtitle: String,
        description: String,
        createdDate: String,
        updatedDate: String,
        cover: String,
        tags: Array,
        content: { type: Object, required: true },
        views: Number,
    });
    Blog.Model = (0, mongoose_1.model)('Blog', Blog.BlogSchema);
})(Blog = exports.Blog || (exports.Blog = {}));
