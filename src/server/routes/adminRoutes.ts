const { Router } = require('express');
const { isAuthorised } = require('../controllers/authController');
const adminController = require('../controllers/adminController');

const router = Router();

// Routes ----------------------------------------------------
router.get('/dashboard', isAuthorised, (req, res) => { adminController.dashboard_get(req, res) });

router.get('/dashboard/blog', isAuthorised, (req, res) => { adminController.dashboard_blog_get(req, res) });

router.get('/dashboard/blog/new', isAuthorised, (req, res) => { adminController.dashboard_blog_new_get(req, res) });

router.post('/dashboard/blog/new', isAuthorised, (req, res) => { adminController.dashboard_blog_new_post(req, res) });

router.get('/dashboard/blog/edit/:blogURI', isAuthorised, (req, res) => { adminController.dashboard_blog_editURI(req, res) });

router.post('/dashboard/blog/edit/:blogURI', isAuthorised, (req, res) => { adminController.dashboard_blog_editURI_post(req, res) });

module.exports = router