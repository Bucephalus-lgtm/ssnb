const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require('../controllers/user');

router.get('/check', function(req, res){
    res.send('Is it okay?');
});

router.get('/secret/:userId', requireSignin, isAuth,  function (req, res) {
    res.json({
        user: req.profile
    });
});

router.param('userId', userById);

module.exports = router;