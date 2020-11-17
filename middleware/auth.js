const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.requireAuth = (req, res, next) => {

    const token = req.cookies.jwtauth;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/users/signin');
            } else {
                console.log(decodedToken);

                if (decodedToken.role === 1) {
                    res.status(200).json('Hi, You are an admin! Congratulations!');
                    console.log('You are an admin! Congratulations!');
                    // next();
                } else {
                    res.send('You are a registered user!');
                    // next();
                }
            }
        });
        // console.log(req.cookies.jwtauth);
        // res.json(req.cookies.jwtauth);
    } else {
        res.redirect('/users/signin');
    }
}  

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwtauth;
    // console.log(token);
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
        //   console.log(user);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };