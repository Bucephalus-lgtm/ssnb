const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('gallery');
});

// const { read, galleryById } = require('../controllers/gallery');

// router.get("/:galleryId", read);
// router.param("galleryId", galleryById);

module.exports = router;