const User = require('../models/user');

exports.userById = function (req, res, next, id) {
    User.findById(id).exec(function (err, user) {
        if (err || !user) {
            return res.status(400).json({
                error: 'User does not exist!'
            });
        }

        req.profile = user;
        next();
    });
}