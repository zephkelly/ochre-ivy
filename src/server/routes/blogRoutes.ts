const { Router } = require('express');
const blogController = require('../controllers/blogController');

const router = Router();

//Routes
app.get('/blog', (req, res) => { blogController.blog_get(req, res) });

app.get('/blog/:blogTitle', (req, res) => { blogController.blog_getID(req, res) });

app.post('/blog', (req, res) => { blogController.blog_post(req, res) });