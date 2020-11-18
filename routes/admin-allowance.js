const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('all-admin-link');
});

module.exports = router;