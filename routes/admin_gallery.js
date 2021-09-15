const { Router } = require('express');
const router = Router();
const { create, getAllPhotos } = require('../controllers/gallery');

router.get('/', getAllPhotos);

router.get('/test', (req, res) => res.send('It is working!'));

router.post("/create", create);

module.exports = router;