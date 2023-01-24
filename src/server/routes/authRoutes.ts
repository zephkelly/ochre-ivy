const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

//API Routes ------------------------------------------------
router.post("/api/signup", (req, res) => { authController.signup_post(req, res) });
router.post("/api/login", (req, res) => { authController.login_post(req, res) });
router.get("/api/logout", (req, res) => { authController.logout_get(req, res) });
router.post("/api/makeAdmin/:email", (req, res) => { authController.makeAdmin_get(req, res) });

//Routes ------------------------------------------------
router.get("/signup", (req, res) => { authController.signup_page(req, res) });
router.get("/login", (req, res) => { authController.login_page(req, res) });

module.exports = router;