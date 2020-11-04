const express = require('express');
const router = express.Router();
const sendMail = require('../routes/mail');

router.get('/', (req, res) => {
    res.render('mail');
});

router.post('/', (req, res) => {
    const { subject, email, text } = req.body;
    // console.log('Data: ', req.body);
    console.log(subject);
    console.log(email);
    console.log(text);

    sendMail(email, subject, text, function (err, data) {
        if (err) {
            console.log('ERROR: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        console.log('Email sent!!!');
        return res.json({ message: 'Email sent!!!!!' });
    });
});

router.get('/error', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views', 'error.html'));
    res.send('Some rror occured!');
});

// Email sent page
router.get('/email/sent', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views', 'emailMessage.html'));
    res.send('Mail sent successfully!');
});

module.exports = router;