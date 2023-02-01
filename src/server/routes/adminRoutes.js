var Router = require('express').Router;
var isAuthorised = require('../controllers/authController').isAuthorised;
var adminController = require('../controllers/adminController');
var router = Router();
// Routes ----------------------------------------------------
router.get('/dashboard', isAuthorised, function (req, res) { adminController.dashboard_get(req, res); });
router.get('/dashboard/blog', isAuthorised, function (req, res) { adminController.dashboard_blog_get(req, res); });
router.get('/dashboard/blog/new', isAuthorised, function (req, res) { adminController.dashboard_blog_new_get(req, res); });
router.post('/dashboard/blog/new', isAuthorised, function (req, res) { adminController.dashboard_blog_new_post(req, res); });
router.get('/dashboard/blog/edit/:blogURI', isAuthorised, function (req, res) { adminController.dashboard_blog_editURI(req, res); });
router.post('/dashboard/blog/edit/:blogURI', isAuthorised, function (req, res) { adminController.dashboard_blog_editURI_post(req, res); });
module.exports = router;
