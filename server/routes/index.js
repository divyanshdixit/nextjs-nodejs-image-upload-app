const uploadimage = require('../controllers/uploadimage');
const { upload } = require('../middleware/upload');

const router = require('express').Router();

router.post('/', upload.single('image'),  uploadimage)

module.exports = router;