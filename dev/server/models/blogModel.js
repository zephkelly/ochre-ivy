"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = exports.BlogSchema = void 0;
const mongoose_1 = require("mongoose");
exports.BlogSchema = new mongoose_1.default.Schema({
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
exports.BlogModel = mongoose_1.default.model('Blog', exports.BlogSchema);
exports.default = exports.BlogModel;
