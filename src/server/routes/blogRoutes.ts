const { Router } = require('express');
const blogController = require('../controllers/blogController');
const { isAuthorised } = require('../controllers/authController');

const router = Router();

//API Routes ------------------------------------------------
router.get('/api/blog', (req, res) => { blogController.blogAPI_get(req, res) });

router.get('/api/blog/:blogID', (req, res) => { blogController.blogAPI_getID(req, res) });

router.post('/api/blog', isAuthorised, (req, res, next) => { blogController.blogAPI_post(req, res) });

router.put('/api/blog/:blogID', isAuthorised, (req, res) => { blogController.blogAPI_update(req, res) });

router.delete('/api/blog/:blogID', isAuthorised, (req, res) => { blogController.blogAPI_delete(req, res) });

//Routes ------------------------------------------------
router.get('/blog/:blogID', (req, res) => { blogController.blog_getID(req, res); });

router.get('/blog', (req, res) => { });

module.exports = router;