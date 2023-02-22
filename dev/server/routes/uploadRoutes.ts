export { };

const { Router } = require('express');
const router = Router();

const upload = require('../../server').upload;

const uploadController  = require('../controllers/uploadController');
const { isAuthorised } = require('../controllers/authController');

//API Routes ------------------------------------------------

router.post('/api/blog/imageupload', isAuthorised, upload.single('blogImage'), (req, res) => { uploadController.uploadAPI_imageUpload(req, res); });

router.post('/api/blog/removeimages', isAuthorised, (req, res) => { uploadController.uploadAPI_removeimages(req, res); });

module.exports = router;