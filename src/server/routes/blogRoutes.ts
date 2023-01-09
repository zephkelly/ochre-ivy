const { Router } = require('express');
const blogController = require('../controllers/blogController');

const router = Router();

//Routes
router.get('/blog', (req, res) => { blogController.blog_get(req, res) });

router.get('/blog/:blogTitle', (req, res) => { blogController.blog_getTitle(req, res) });

router.post('/blog', authController.isAuthed(), (req, res) => { blogController.blog_post(req, res) });