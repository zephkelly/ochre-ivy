export { };

const { Router } = require('express');

const analyticsController = require('../controllers/analyticsController');

const router = Router();

//API Routes ------------------------------------------------
router.get('/api/analytics', (req, res) => { analyticsController.analyticsAPI_get(req, res) });

module.exports = router;