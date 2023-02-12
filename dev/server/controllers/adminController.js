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
exports.dashboard_blog_editURI_post = exports.dashboard_blog_editURI = exports.dashboard_blog_new_post = exports.dashboard_blog_new_get = exports.dashboard_blog_get = exports.dashboard_get = void 0;
const mongoose = require('mongoose').mongoose;
const fetch = require("node-fetch-commonjs");
function dashboard_get(req, res) {
    const session = { name: null, admin: false };
    if (req.session.userid) {
        session.name = req.session.name;
        if (req.session.roles == 'admin') {
            session.admin = true;
        }
    }
    res.render('admin/admin-dashboard', { session });
}
exports.dashboard_get = dashboard_get;
function dashboard_blog_get(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = { name: null, admin: false };
        if (req.session.userid) {
            session.name = req.session.name;
            if (req.session.roles == 'admin') {
                session.admin = true;
            }
        }
        const response = yield fetch('http://localhost:62264/api/blog/');
        if (response.status == 200) {
            const blogsData = yield response.json();
            res.render('admin/admin-dashboard-blog', { session, blogsData }, (err, html) => {
                if (err) {
                    return console.log(err);
                }
                res.status(200).send(html);
                return;
            });
        }
        else {
            res.status(response.status).send();
            return;
        }
    });
}
exports.dashboard_blog_get = dashboard_blog_get;
function dashboard_blog_new_get(req, res) {
    const blogData = { uri: null, data: null };
    res.render('admin/blog-editor', { blogData }, (err, html) => {
        if (err) {
            return console.log(err);
        }
        res.status(200).send(html);
        return;
    });
}
exports.dashboard_blog_new_get = dashboard_blog_new_get;
function dashboard_blog_new_post(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:62264/api/blog/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        if (response.status == 200) {
            res.status(200).send();
            return;
        }
        else {
            res.status(response.status).send();
            return;
        }
    });
}
exports.dashboard_blog_new_post = dashboard_blog_new_post;
function dashboard_blog_editURI(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:62264/api/blog/' + req.params.blogURI);
        const session = { admin: false };
        if (response.status == 200) {
            const blogData = { uri: req.params.blogURI, data: yield response.json() };
            if (req.session.admin) {
                session.admin = true;
            }
            res.render('admin/blog-editor', { session, blogData }, (err, html) => {
                if (err) {
                    return console.log(err);
                }
                res.status(200).send(html);
                return;
            });
        }
    });
}
exports.dashboard_blog_editURI = dashboard_blog_editURI;
function dashboard_blog_editURI_post(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:62264/api/blog/' + req.params.blogURI, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        if (response.status == 200) {
            res.status(200).send();
            return;
        }
        else {
            res.status(response.status).send();
            return;
        }
    });
}
exports.dashboard_blog_editURI_post = dashboard_blog_editURI_post;
