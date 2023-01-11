var Router = require('express').Router;
var authController = require('../controllers/authController');
var router = Router();
//Routes
router.get("/signup", function (req, res) { authController.signup_get(req, res); });
router.post("/signup", function (req, res) { authController.signup_post(req, res); });
router.get("/login", function (req, res) { authController.login_get(req, res); });
router.post("/login", function (req, res) { authController.login_post(req, res); });
module.exports = router;
