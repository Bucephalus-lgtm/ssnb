const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
    res.render('mail');
});

router.post('/', (req, res) => {
    const smtpTrans = nodemailer.createTransport({
        service: 'gmail',
        type: 'SMTP',
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOpts = {
        from: 'bhargabnath691@gmail.com',
        to: 'bhargabnath691@gmail.com',
        subject: "Message from students",
        html: `<h2> ${req.body.name} </h2> : <p> ${req.body.message}</p>`
    }

    smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
            console.log(error);
            // res.send('failed') // Show a page indicating failure
            res.json({
                msg: 'failed!',
                error
            });
        } else {
            // res.send('success') // Show a page indicating success
            res.json({
                msg: 'success!'
            });
        }
    })
});

module.exports = router;