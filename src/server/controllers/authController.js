"use strict";
exports.__esModule = true;
exports.isAuthorised = exports.signup_post = exports.signup_get = exports.login_post = exports.login_get = void 0;
//Login
function login_get(req, res) {
    res.render('login');
}
exports.login_get = login_get;
;
function login_post(req, res) {
    res.send('user login');
}
exports.login_post = login_post;
;
//Signup
function signup_get(req, res) {
    res.render('signup');
}
exports.signup_get = signup_get;
;
function signup_post(req, res) {
    res.send('new signup');
}
exports.signup_post = signup_post;
;
//Authentication middleware
function isAuthorised(req, res, next) {
    console.log("Here is the auth step");
    return next();
}
exports.isAuthorised = isAuthorised;
