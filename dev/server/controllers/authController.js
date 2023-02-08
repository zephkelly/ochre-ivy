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
exports.login_post = exports.login_get = exports.signup_post = exports.signup_get = exports.makeAdmin_get = exports.logout_get = exports.isAuthorised = void 0;
var bcrypt = require("bcrypt");
var express = require('express');
var mongoose = require('mongoose').mongoose;
var fetch = require("node-fetch-commonjs");
var ejs = require('ejs').ejs;
var saltRounds = 12;
// Models ------------------------------------------------
var userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        trim: true,
        default: '',
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: String,
    joined: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    roles: {
        type: String,
        default: 'user'
    },
});
var User = mongoose.model('User', userSchema);
// Middleware --------------------------------------------
//Authentication
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
    return next();
}
exports.isAuthorised = isAuthorised;
// API Routes ---------------------------------------------
function logout_get(req, res) {
    req.session.destroy();
    res.redirect("/");
}
exports.logout_get = logout_get;
;
function makeAdmin_get(req, res) {
    User.findOneAndUpdate({ email: req.params.email }, { roles: 'admin' }, { new: true }, function (err, user) {
        if (err) {
            res.send(err);
            return;
        }
        res.send("SERVER: Sucessfully made user admin");
    });
}
exports.makeAdmin_get = makeAdmin_get;
;
// Routes -------------------------------------------------
// Sign up
function signup_get(req, res) {
    var data = { message: "", completed: false };
    res.status(200).render('signup', { data: data });
}
exports.signup_get = signup_get;
;
function signup_post(req, res) {
    var _this = this;
    User.find({ email: req.body.email }, function (err, user) { return __awaiter(_this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            if (err) {
                res.status(500).send(err);
                return [2 /*return*/];
            }
            if (user.length > 0) {
                data = { message: "Account already registered with that email!", completed: false };
                res.render('signup', { data: data }, function (err, html) {
                    if (err) {
                        return console.log(err);
                    }
                    res.status(409).send(html);
                    return;
                });
            }
            else {
                bcrypt.hash(JSON.stringify(req.body.password), saltRounds, function (err, hash) {
                    User.create({ name: req.body.name, email: req.body.email, password: hash }, function (err, user) {
                        if (err) {
                            res.status(500).send(err);
                            return;
                        }
                        var data = { message: "", completed: true };
                        res.render('signup', { data: data }, function (err, html) {
                            if (err) {
                                return console.log(err);
                            }
                            res.status(200).send(html);
                            return;
                        });
                    });
                });
            }
            return [2 /*return*/];
        });
    }); });
}
exports.signup_post = signup_post;
;
// Log in
function login_get(req, res) {
    if (req.session.userid) {
        res.redirect("/");
        return;
    }
    var data = { message: "" };
    res.render('login', { data: data }, function (err, html) {
        if (err) {
            return console.log(err);
        }
        res.status(200).send(html);
        return;
    });
}
exports.login_get = login_get;
function login_post(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        var _this = this;
        return __generator(this, function (_a) {
            //Check session
            if (req.session.userid) {
                res.redirect("/");
                return [2 /*return*/];
            }
            //Validate inputs
            if (req.body.email == null || req.body.password == null) {
                data = { message: "Email or password is empty." };
                res.render('login', { data: data }, function (err, html) {
                    if (err) {
                        return console.log(err);
                    }
                    res.status(400).send(html);
                    return;
                });
            }
            //Check if user exists
            User.find({ email: req.body.email }, function (err, user) { return __awaiter(_this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    data = {
                        message: null
                    };
                    if (user.length == 0) {
                        data.message = "Email or password is incorrect";
                        res.render('login', { data: data }, function (err, html) {
                            if (err) {
                                return console.log(err);
                            }
                            res.status(401).send(html);
                            return;
                        });
                    }
                    else {
                        bcrypt.compare(JSON.stringify(req.body.password), user[0].password, function (err, match) {
                            if (match) {
                                req.session.userid = user[0]._id;
                                req.session.email = user[0].email;
                                req.session.name = user[0].name;
                                req.session.roles = user[0].roles;
                                req.session.save();
                                var string = encodeURIComponent('true');
                                res.status(200).redirect("/?loggingIn=" + string);
                                return;
                            }
                            else {
                                data.message = "Email or password is incorrect";
                                res.render('login', { data: data }, function (err, html) {
                                    if (err) {
                                        return console.log(err);
                                    }
                                    res.status(401).send(html);
                                    return;
                                });
                            }
                        });
                    }
                    return [2 /*return*/];
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.login_post = login_post;
;
