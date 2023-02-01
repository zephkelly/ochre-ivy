var Router = require('express').Router;
var authController = require('../controllers/authController');
var router = Router();
//API Routes ------------------------------------------------
router.get("/api/logout", function (req, res) { authController.logout_get(req, res); });
router.get("/api/op/:email", authController.isAuthorised, function (req, res) { authController.makeAdmin_get(req, res); });
//Routes ------------------------------------------------
router.post("/signup", function (req, res) { authController.signup_post(req, res); });
router.get("/signup", function (req, res) { authController.signup_get(req, res); });
router.post("/login", function (req, res) { authController.login_post(req, res); });
router.get("/login", function (req, res) { authController.login_get(req, res); });
module.exports = router;
