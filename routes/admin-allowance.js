const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, function(req, res) {
    res.render('all-admin-link');
});

module.exports = router;