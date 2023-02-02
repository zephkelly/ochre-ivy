"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require('express').Router;
var adminController = require('../controllers/adminController');
var isAuthorised = require('../controllers/authController').isAuthorised;
var router = Router();
// Routes ----------------------------------------------------
router.get('/dashboard', isAuthorised, function (req, res) { adminController.dashboard_get(req, res); });
router.get('/dashboard/blog', isAuthorised, function (req, res) { adminController.dashboard_blog_get(req, res); });
router.get('/dashboard/blog/new', isAuthorised, function (req, res) { adminController.dashboard_blog_new_get(req, res); });
router.post('/dashboard/blog/new', isAuthorised, function (req, res) { adminController.dashboard_blog_new_post(req, res); });
router.get('/dashboard/blog/edit/:blogURI', isAuthorised, function (req, res) { adminController.dashboard_blog_editURI(req, res); });
router.post('/dashboard/blog/edit/:blogURI', isAuthorised, function (req, res) { adminController.dashboard_blog_editURI_post(req, res); });
module.exports = router;
