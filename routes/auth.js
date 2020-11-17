const express = require("express");
const router = express.Router();

const { signup_get, signup_post, signin_get, signin_post, activateAccount, signout_get } = require('../controllers/auth');

router.get('/signup', signup_get);
router.post('/signup', signup_post);
router.get('/authentication/activate/:token', activateAccount);
router.get('/signin', signin_get);
router.post('/signin', signin_post);
router.get('/signout', signout_get);

// const {
//     signup,
//     signin,
//     signout,
//     requireSignin
// } = require("../controllers/auth");
// const { userSignupValidator } = require("../validator");

// router.get('/signup', function(req, res){
//     res.render('signup');
// });

// router.post("/signup", userSignupValidator, signup);

// router.get('/signin', function(req, res){
//     res.render('signin');
// });
// router.post("/signin", signin);
// router.get("/signout", signout);

module.exports = router;