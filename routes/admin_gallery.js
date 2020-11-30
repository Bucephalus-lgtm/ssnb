const express = require('express');
const router = express.Router();
const mkdirp = require('mkdirp');

const Gallery = require('../models/gallery');

router.post('/add-gallery', function (req, res) {
    console.log(req.files);
    // const title = req.body.title;

    const file = typeof req.files.notice !== 'undefined' ? req.files.notice.name : '';

    // // req.checkBody('file', 'You must upload a file!!!').isDocument(file);

    console.log(file);

    // const errors = req.validationErrors();

    // if (errors) {
    //     console.log(errors);
    // } 
    // else {
    // Gallery.findOne({ _id }, function (err, f) {
    // if (f) {
    //     throw f;
    //     // req.flash('danger', 'A file with this name exists already, choose another.');
    // } else {
    const gallery = new Gallery({
        file: file
    });

    gallery.save(
        // mkdirp('public/gallery/' + gallery._id, (err) => {
        //     if(err) { console.log(err); }
        // })
    );
    console.log(gallery._id);

    const made = mkdirp.sync('/tmp/foo/bar/baz')
    console.log(`made directories, starting with ${made}`)

    // gallery.save(function (err) {
    //     if (err) {
    //         return console.log(err);
    //     }

    //     mkdirp('public/gallery/' + gallery._id, function (err) {
    //         return console.log(err);
    //     });

    //     if (file != '') {
    //         const galleryDir = req.files.notice;
    //         const path = 'public/gallery/' + gallery._id + '/' + file;

    //         console.log(path);

    //         galleryDir.mv(path, function (err) {
    //             return console.log(err);
    //         });
    //     }

    //     // req.flash('success', 'Notice added!');
    //     // res.redirect('/gallery');
    // });
    // // }
    // });
    // }
});

module.exports = router;