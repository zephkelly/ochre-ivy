var Router = require('express').Router;
var blogController = require('../controllers/blogController');
var isAuthorised = require('../controllers/authController').isAuthorised;
var router = Router();
//API Routes ------------------------------------------------
router.get('/api/blog', function (req, res) { blogController.blogAPI_get(req, res); });
router.get('/api/blog/:blogURI', function (req, res) { blogController.blogAPI_getURI(req, res); });
router.post('/api/blog', isAuthorised, function (req, res) { blogController.blogAPI_post(req, res); });
router.put('/api/blog/:blogURI', isAuthorised, function (req, res) { blogController.blogAPI_update(req, res); });
router["delete"]('/api/blog/:blogURI', isAuthorised, function (req, res) { blogController.blogAPI_delete(req, res); });
//Routes ------------------------------------------------
router.get('/blog/:blogURI', function (req, res) { blogController.blog_getURI(req, res); });
router.get('/blog', function (req, res) { blogController.blog_homePage(req, res); });
module.exports = router;
