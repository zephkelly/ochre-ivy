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
exports.isAuthorised = exports.logout_get = exports.login_page = exports.signup_get = exports.makeAdmin_get = exports.signup_post = exports.login_post = void 0;
var bcrypt = require("bcrypt");
var express = require('express');
var mongoose = require('mongoose').mongoose;
var fetch = require("node-fetch-commonjs");
var ejs = require('ejs').ejs;
var saltRounds = 12;
// Models ------------------------------------------------
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        "default": '',
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: String,
    joined: {
        type: Date,
        "default": Date.now
    },
    lastLogin: {
        type: Date,
        "default": Date.now
    },
    roles: {
        type: String,
        "default": 'user'
    }
});
var User = mongoose.model('User', userSchema);
// API Routes ---------------------------------------------
function login_post(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            //Check session
            if (req.session.userid) {
                console.log("Already logged in");
                res.status(200).redirect("/");
                return [2 /*return*/];
            }
            //Validate inputs
            if (req.body.email == null || req.body.password == null) {
                res.status(400).send("Missing email or password");
                return [2 /*return*/];
            }
            //Check if user exists
            User.find({ email: req.body.email }, function (err, user) { return __awaiter(_this, void 0, void 0, function () {
                var match;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(user.length == 0)) return [3 /*break*/, 1];
                            res.status(404).send("Incorrect email or password");
                            return [2 /*return*/];
                        case 1: return [4 /*yield*/, bcrypt.compare(req.body.password, user[0].password)];
                        case 2:
                            match = _a.sent();
                            if (match) {
                                req.session.userid = user[0]._id;
                                req.session.email = user[0].email;
                                req.session.roles = user[0].roles;
                                req.session.save();
                                console.log("Logging in user");
                                res.status(200).redirect("/");
                                return [2 /*return*/];
                            }
                            else {
                                res.status(401).send("Incorrect email or password");
                                return [2 /*return*/];
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.login_post = login_post;
;
function signup_post(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            User.find({ email: req.body.email }, function (err, user) { return __awaiter(_this, void 0, void 0, function () {
                var hashedPassword;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (err) {
                                res.status(500).send(err);
                                return [2 /*return*/];
                            }
                            if (!(user.length > 0)) return [3 /*break*/, 1];
                            res.status(409).send("User with that email already exists");
                            return [2 /*return*/];
                        case 1: return [4 /*yield*/, bcrypt.hash(req.body.password, saltRounds)];
                        case 2:
                            hashedPassword = _a.sent();
                            User.create({ email: req.body.email, password: hashedPassword }, function (err, user) {
                                if (err) {
                                    res.status(500).send(err);
                                    return;
                                }
                                res.status(200).send("Sucessfully signed up user");
                            });
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.signup_post = signup_post;
;
function makeAdmin_get(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            User.findOneAndUpdate({ email: req.params.email }, { roles: 'admin' }, { "new": true }, function (err, user) {
                if (err) {
                    res.send(err);
                }
                else {
                    console.log(user.roles);
                    res.send("Sucessfully made user admin");
                }
            });
            return [2 /*return*/];
        });
    });
}
exports.makeAdmin_get = makeAdmin_get;
;
// Routes -------------------------------------------------
function signup_get(req, res) {
    res.render('signup');
}
exports.signup_get = signup_get;
;
function login_page(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (req.session.userid != null) {
                console.log("Already logged in");
                res.redirect("/");
                return [2 /*return*/];
            }
            res.render('login');
            return [2 /*return*/];
        });
    });
}
exports.login_page = login_page;
function logout_get(req, res) {
    req.session.destroy();
    res.redirect("/");
}
exports.logout_get = logout_get;
;
//Authentication middleware
function isAuthorised(req, res, next) {
    if (req.session.userid == null) {
        console.log("Not logged in");
        res.status(401).redirect("/login");
        return;
    }
    if (req.session.roles != 'admin') {
        console.log(req.session.roles);
        console.log("Not an admin");
        res.status(403).redirect("/blog");
        return;
    }
    console.log("Authenticated");
    return next();
}
exports.isAuthorised = isAuthorised;
