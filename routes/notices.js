const express = require('express');
const router = express.Router();
const Notice = require('../models/notice');

router.get('/list', function (req, res) {
    Notice.find({}).exec(function (err, notices) {
        res.render('notices', {
            notices: notices,
        });
    });
});

module.exports = router;