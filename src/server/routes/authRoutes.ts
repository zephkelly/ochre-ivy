const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

//Routes
router.get("/signup", (req, res) => { authController.signup_get(req, res) });
router.post("/signup", (req, res) => { authController.signup_post(req, res) });
router.get("/login", (req, res) => { authController.login_get(req, res) });
router.post("/login", (req, res) => { authController.login_post(req, res) });

module.exports = router;