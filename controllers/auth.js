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
const createToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
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
                return res.status(400).json({
                    message: 'Please check your email id to activate your account!'
                });
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
        const token = createToken(user._id);
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