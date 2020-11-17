const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../helper/dbErrorHandler');
const router = require('../routes/auth');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'medicalreporthelp@gmail.com',
        pass: process.env.MAIL_PASSWORD
    }
});

const maxAge = 3 * 24 * 60 * 60;
const createToken = role => {
    return jwt.sign({ role }, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge
    });
};

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.signup_post = (req, res) => {
    const { name, email, password } = req.body;

    const fullUrl = req.protocol + '://' + req.get('host');
    console.log(fullUrl);

    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'This email id is already registered!!!'
            });
        }

        const token = jwt.sign({ name, email, password }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
        console.log(token);

        const mailOptions = {
            from: 'ssnbhelp@protonmail.com',
            to: email,
            subject: 'Account activation link',
            html:
                // `<h3>Please <a href="http://localhost:5000/api/authentication/activate/${token}">click</a> here to activate your account.
                //         `
                `<h3>Please <a href="${fullUrl}/users/authentication/activate/${token}">click</a> here to activate your account.
                        `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });
}

module.exports.activateAccount = (req, res) => {
    const token = req.params.token;
    console.log(req.params);
    // res.send('You are successfully signed up!');
    // const token = req.body.token;
    // console.log(token);
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/api/signup');
            } else {
                console.log(decodedToken);
                const { name, email, password } = decodedToken;
                const user = new User({ name, email, password });
                user.save((err, user) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(user);
                })
            }
        });
        // console.log(req.cookies.jwtauth);
        // res.json(req.cookies.jwtauth);
    } else {
        res.redirect('/api/signup');
    }
}

module.exports.signin_get = (req, res) => {
    res.render('signin');
}

module.exports.signin_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signin(email, password);
        const token = createToken(user.role);
        res.cookie('jwtauth', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user.role });
    }
    catch (err) {
        // res.status(400).json(errorHandler(err) );
        console.log(err);
    }
}

module.exports.signout_get = (req, res) => {
    res.cookie('jwtauth', '', { maxAge: 1 });
    res.redirect('/users/signup');
}


// exports.signup = function (req, res) {
//     console.log(req.body);
//     const user = new User(req.body);
//     user.save(function (err, user) {
//         if (err) {
//             return res.status(400).json({
//                 error: errorHandler(err)
//             });
//         }
//         user.salt = undefined,
//             user.hashed_password = undefined
//         res.json({
//             user
//         });
//     });
// }

// exports.signin = (req, res) => {
//     const { email, password } = req.body;
//     User.findOne({ email }, (err, user) => {
//         if (err || !user) {
//             return res.status(400).json({
//                 error: 'User with that email does not exist. Please signup'
//             });
//         }

//         if (!user.authenticate(password)) {
//             return res.status(401).json({
//                 error: 'Email and password dont match'
//             });
//         }
//         // generate a signed token with user id and secret
//         const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
//         // persist the token as 't' in cookie with expiry date
//         res.cookie('t', token, { expire: new Date() + 9999 });
//         // return response with user and token to frontend client
//         const { _id, name, email, role } = user;
//         // return res.json({ token, user: { _id, email, name, role } });
//         return res.redirect('/');
//     });
// }

// exports.signout = function (req, res) {
//     res.clearCookie('t');
//     return res.json({ msg: 'You have been signed out successfuly!' })
// }

// exports.requireSignin = expressJwt({
//     secret: process.env.JWT_SECRET,
//     algorithms: ['HS256'],
//     userProperty: 'auth'
// });

// exports.isAuth = (req, res, next) => {
//     let user = req.profile && req.auth && req.profile._id == req.auth._id;
//     if (!user) {
//         return res.status(403).json({
//             error: 'Access denied'
//         });
//     }
//     next();
// };

// exports.isAdmin = function (req, res, next) {
//     if (req.profile.role === 0) {
//         res.status(403).json({
//             error: 'Admin resource! Access denied!'
//         });
//     }
//     next();
// }