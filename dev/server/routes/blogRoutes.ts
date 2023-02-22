export { };

const { Router } = require('express');
const { multer }= require('multer');

const blogController = require('../controllers/blogController');
const uploadController = require('../controllers/uploadController');
const { isAuthorised } = require('../controllers/authController');
const { upload } = require('../../server');

const router = Router();

//API Routes ------------------------------------------------
router.get('/api/blog', (req, res) => { blogController.blogAPI_get(req, res) });

router.get('/api/blog/:blogURI', (req, res) => { blogController.blogAPI_getURI(req, res) });

router.post('/api/blog', isAuthorised, (req, res) => {
  blogController.blogAPI_post(req, res)
  uploadController.uploadAPI_clearUploadSession(req, res);
});

router.put('/api/blog/:blogURI', isAuthorised, (req, res) => { blogController.blogAPI_update(req, res) });

router.delete('/api/blog/:blogURI', isAuthorised, (req, res) => { blogController.blogAPI_delete(req, res) });

//Routes ------------------------------------------------
router.get('/blog', (req, res) => { blogController.blog_homePage(req, res); });

router.get('/blog/:blogURI', (req, res) => { blogController.blog_getURI(req, res); });

module.exports = router;