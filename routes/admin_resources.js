const express = require('express');
const router = express.Router();
const mkdirp = require('mkdirp');

const Subject = require('../models/subject');
const Resource = require('../models/resource');

router.get('/add-resource', function (req, res) {
    const chapter_no = '';
    const subject_name = '';
    res.render('admin/add-resource');
});

router.post('/add-resource', function (req, res) {
    if (req.files) {
        console.log(req.files);
    }

    const imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";
    const file = typeof req.files.file !== 'undefined' ? req.files.file.name : '';

    // req.checkBody('full_name', 'A faculty must have a name!').notEmpty();
    // req.checkBody('qualification', 'The faculty member must have some educational qualification!').notEmpty();

    const class_name = req.body.class_name;
    const class_slug = class_name.replace(/\s+/g, '-').toLowerCase();
    const subject_name = req.body.subject_name;
    const chapter_no = req.body.chapter_no;
    const chapter_name = req.body.chapter_name;
    const fileName = req.body.fileName;

    const errors = req.validationErrors();

    if (errors) {
        res.render('admin/add-resource', {
            errors: errors
        });
    } else {
        // Resource.findOne({ class_slug: class_slug }, function (err, resource) {
        // if (resource) {
        //     req.flash('danger', 'This file is already added!');
        //     res.render('admin/add-resource', {
        //         class_name: class_name,
        //         class_slug: class_slug,
        //         subjects: [{
        //             subject_name: subject_name,
        //             chapters: [{
        //                 chapter_no: chapter_no,
        //                 chapter_name: chapter_name,
        //                 image: imageFile
        //             }]
        //         }]
        //     });
        // } else {
        const resource = new Resource({
            class_name: class_name,
            // class_slug: class_slug,
            subjects: [{
                subject_name: subject_name,
                chapters: [{
                    chapter_no: chapter_no,
                    chapter_name: chapter_name,
                    image: imageFile,
                    fileName: fileName,
                    file: file
                }]
            }]
        });

        resource.save(function (err) {
            if (err)
                return console.log(err);

            mkdirp('public/resources/' + resource.class_name, function (err) {
                return console.log(err);
            });
            mkdirp('public/resources/' + resource.class_name + '/' + resource.subjects[0].subject_name, function (err) {
                return console.log(err);
            });

            mkdirp('public/resources/' + resource.class_name + '/' + resource.subjects[0].subject_name
                + '/' + resource.subjects[0].chapters[0].chapter_no, function (err) {
                    return console.log(err);
                });
            mkdirp('public/resources/' + resource.class_name + '/' + resource.subjects[0].subject_name
                + '/' + resource.subjects[0].chapters[0].chapter_no + '/', function (err) {
                    return console.log(err);
                });

            if (file != '' && imageFile == "") {
                const fileDir = req.files.file;
                let path = 'public/resources/' + resource.class_name + '/' + resource.subjects[0].subject_name
                    + '/' + resource.subjects[0].chapters[0].chapter_no
                    + '/' + file;

                console.log(path);

                fileDir.mv(path, function (err) {
                    return console.log(err);
                });
            } 
            else if (imageFile != '' && file == '') {
                const resourceImage = req.files.image;
                console.log(resourceImage);
                let path = 'public/resources/' + resource.class_name + '/' + resource.subjects[0].subject_name
                    + '/' + resource.subjects[0].chapters[0].chapter_no
                    + '/' + imageFile;

                resourceImage.mv(path, function (err) {
                    return console.log(err);
                });
            }

            // req.flash('success', 'Resource added!');
            res.redirect('/resources');
        });
    }

});

router.get('/edit-resource/:id', function (req, res) {

    Resource.findById(req.params.id, function (err, resource) {
        if (err)
            return console.log(err);

        res.render('admin/edit-resource', {
            id: resource._id,
            subject_name: resource.subject_name,
            chapter_no: resource.chapter_no,
            chapter_name: resource.chapter_name
        });
    });

});

router.get('/add-chapter', function (req, res) {
    res.render('admin/add-chapter');
});

router.post('/add-chapter', function (req, res) {

    // req.checkBody('title', 'Title must have a value.').notEmpty();
    // req.checkBody('content', 'Content must have a value.').notEmpty();

    const class_ = req.body.class_;
    const slug = class_.replace(/\s+/g, '-').toLowerCase();
    const sub_no = req.body.sub_no;
    const sub_name = req.body.sub_name;

    var errors = req.validationErrors();

    if (errors) {
        res.render('admin/add-chapter', {
            errors: errors
        });
    } else {
        const subject = new Subject({
            class_: class_,
            slug: slug,
            subjects: [{
                sub_no: sub_no,
                sub_name: sub_name
            }]
        });

        subject.save(function (err) {
            if (err)
                return console.log(err);

            // req.flash('success', 'Subject added!');
            res.redirect('/resources');
        });
    }

});

module.exports = router;