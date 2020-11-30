const express = require('express');
const router = express.Router();
const Notice = require('../models/notice');
// const { requireAuth } = require('../middleware/auth');
const { getNoticeById, readNoticeById } = require('../controllers/notice');

router.get('/list', function(req, res) {
    Notice.find({}).exec(function(err, notices) {
        res.render('notices', {
            notices: notices,
        });
    });
});

router.get('/:noticeId', readNoticeById);

router.param('noticeId', getNoticeById);

module.exports = router;