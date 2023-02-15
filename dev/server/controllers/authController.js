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
exports.login_post = exports.login_get = exports.signup_post = exports.signup_get = exports.makeAdmin_get = exports.logout_get = exports.isAuthorised = void 0;
const bcrypt = require("bcrypt");
const express = require('express');
const mongoose = require('mongoose').mongoose;
const fetch = require("node-fetch-commonjs");
const ejs = require('ejs').ejs;
const saltRounds = 12;
// Models ------------------------------------------------
const userSchema = new mongoose.Schema({
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
const User = mongoose.model('User', userSchema);
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
    User.findOneAndUpdate({ email: req.params.email }, { roles: 'admin' }, { new: true }, (err, user) => {
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
    const data = { message: "", completed: false };
    res.status(200).render('signup', { data });
}
exports.signup_get = signup_get;
;
function signup_post(req, res) {
    User.find({ email: req.body.email }, (err, user) => __awaiter(this, void 0, void 0, function* () {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (user.length > 0) {
            const data = { message: "Account already registered with that email!", completed: false };
            res.render('signup', { data }, (err, html) => {
                if (err) {
                    return console.log(err);
                }
                res.status(409).send(html);
                return;
            });
        }
        else {
            bcrypt.hash(JSON.stringify(req.body.password), saltRounds, (err, hash) => {
                User.create({ name: req.body.name, email: req.body.email, password: hash }, (err, user) => {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }
                    const data = { message: "", completed: true };
                    res.render('signup', { data }, (err, html) => {
                        if (err) {
                            return console.log(err);
                        }
                        res.status(200).send(html);
                        return;
                    });
                });
            });
        }
    }));
}
exports.signup_post = signup_post;
;
// Log in
function login_get(req, res) {
    if (req.session.userid) {
        res.redirect("/");
        return;
    }
    const data = { message: "" };
    res.render('login', { data }, (err, html) => {
        if (err) {
            return console.log(err);
        }
        res.status(200).send(html);
        return;
    });
}
exports.login_get = login_get;
function login_post(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check session
        if (req.session.userid) {
            res.redirect("/");
            return;
        }
        const data = { message: null };
        //Validate inputs
        if (req.body.email == null || req.body.password == null) {
            data.message = "Email or password is empty.";
        }
        //Check if user exists
        User.find({ email: req.body.email }, (err, user) => __awaiter(this, void 0, void 0, function* () {
            if (user.length == 0) {
                data.message = "Email or password is incorrect";
            }
            else {
                yield bcrypt.compare(JSON.stringify(req.body.password), user[0].password, (err, match) => {
                    if (match) {
                        req.session.userid = user[0]._id;
                        req.session.email = user[0].email;
                        req.session.name = user[0].name;
                        req.session.roles = user[0].roles;
                        req.session.save();
                        let string = encodeURIComponent('true');
                        return res.status(200).redirect("/?loggingIn=" + string);
                    }
                    else {
                        data.message = "Email or password is incorrect";
                    }
                });
            }
            if (data.message != null) {
                res.render('login', { data }, (err, html) => {
                    if (err) {
                        return console.log(err);
                    }
                    return res.status(401).send(html);
                });
            }
        }));
    });
}
exports.login_post = login_post;
;
