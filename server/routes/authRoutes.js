"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const authController = require('../controllers/authController');
const router = Router();
//API Routes ------------------------------------------------
router.get("/logout", (req, res) => { authController.logout_get(req, res); });
router.get("/api/admin/:email", authController.isAuthorised, (req, res) => { authController.makeAdmin_get(req, res); });
//Routes ------------------------------------------------
router.post("/signup", (req, res) => { authController.signup_post(req, res); });
router.get("/signup", (req, res) => { authController.signup_get(req, res); });
router.post("/login", (req, res) => { authController.login_post(req, res); });
router.get("/login", (req, res) => { authController.login_get(req, res); });
module.exports = router;
