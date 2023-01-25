var Router = require('express').Router;
var authController = require('../controllers/authController');
var router = Router();
//API Routes ------------------------------------------------
router.post("/api/signup", function (req, res) { authController.signup_post(req, res); });
router.post("/api/login", function (req, res) { authController.login_post(req, res); });
router.get("/api/logout", function (req, res) { authController.logout_get(req, res); });
router.post("/api/makeAdmin/:email", authController.isAuthorised, function (req, res) { authController.makeAdmin_get(req, res); });
//Routes ------------------------------------------------
router.get("/signup", function (req, res) { authController.signup_page(req, res); });
router.get("/login", function (req, res) { authController.login_page(req, res); });
module.exports = router;
