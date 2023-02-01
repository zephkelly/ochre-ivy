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
exports.__esModule = true;
exports.dashboard_blog_editURI_post = exports.dashboard_blog_editURI = exports.dashboard_blog_new_post = exports.dashboard_blog_new_get = exports.dashboard_blog_get = exports.dashboard_get = void 0;
var mongoose = require('mongoose').mongoose;
var fetch = require("node-fetch-commonjs");
function dashboard_get(req, res) {
    res.render('admin/dashboard', { title: 'Dashboard' });
}
exports.dashboard_get = dashboard_get;
function dashboard_blog_get(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var response, blogsData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:62264/api/blog/')];
                case 1:
                    response = _a.sent();
                    if (!(response.status == 200)) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    blogsData = _a.sent();
                    res.render('admin/blog', { blogsData: blogsData }, function (err, html) {
                        if (err) {
                            return console.log(err);
                        }
                        res.status(200).send(html);
                        return;
                    });
                    return [3 /*break*/, 4];
                case 3:
                    res.status(response.status).send();
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.dashboard_blog_get = dashboard_blog_get;
function dashboard_blog_new_get(req, res) {
    var blogData = { uri: null, data: null };
    res.render('admin/blog-editor', { blogData: blogData }, function (err, html) {
        if (err) {
            return console.log(err);
        }
        res.status(200).send(html);
        return;
    });
}
exports.dashboard_blog_new_get = dashboard_blog_new_get;
function dashboard_blog_new_post(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:62264/api/blog/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(req.body)
                    })];
                case 1:
                    response = _a.sent();
                    if (response.status == 200) {
                        res.status(200).send();
                        return [2 /*return*/];
                    }
                    else {
                        res.status(response.status).send();
                        return [2 /*return*/];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.dashboard_blog_new_post = dashboard_blog_new_post;
function dashboard_blog_editURI(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var response, blogData;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:62264/api/blog/' + req.params.blogURI)];
                case 1:
                    response = _b.sent();
                    if (!(response.status == 200)) return [3 /*break*/, 3];
                    _a = { uri: req.params.blogURI };
                    return [4 /*yield*/, response.json()];
                case 2:
                    blogData = (_a.data = _b.sent(), _a);
                    res.render('admin/blog-editor', { blogData: blogData }, function (err, html) {
                        if (err) {
                            return console.log(err);
                        }
                        res.status(200).send(html);
                        return;
                    });
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.dashboard_blog_editURI = dashboard_blog_editURI;
function dashboard_blog_editURI_post(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:62264/api/blog/' + req.params.blogURI, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(req.body)
                    })];
                case 1:
                    response = _a.sent();
                    if (response.status == 200) {
                        res.status(200).send();
                        return [2 /*return*/];
                    }
                    else {
                        res.status(response.status).send();
                        return [2 /*return*/];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.dashboard_blog_editURI_post = dashboard_blog_editURI_post;
