const express = require('express');
const router = express.Router();
const Notice = require('../models/notice');
const { requireAuth } = require('../middleware/auth');

router.get('/list', function(req, res) {
    Notice.find({}).exec(function(err, notices) {
        res.render('notices', {
            notices: notices,
        });
    });
});

module.exports = router;