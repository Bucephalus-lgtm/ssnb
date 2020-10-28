const express = require('express');
const router = express.Router();
const mkdirp = require('mkdirp');
// const fs = require('fs-extra');

const Faculty = require('../models/faculty');

router.get('/add-teacher', function (req, res) {
    const full_name = '';
    const qualification = '';
    const contact_no = '';
    const position = '';
    const experience = '';

    Faculty.find(function (err, faculties) {
        res.render('admin/add-teacher', {
            full_name: full_name,
            qualification: qualification,
            contact_no: contact_no,
            position: position,
            experience: experience,
            faculties: faculties
        });
    });
});

router.post('/add-teacher', function (req, res) {
    // if (req.files) {
    //     console.log(req.files);
    // }
    console.log(req.files);
    const imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";
    console.log(imageFile);

    // req.checkBody('full_name', 'A faculty must have a name!').notEmpty();
    // req.checkBody('qualification', 'The faculty member must have some educational qualification!').notEmpty();

    const full_name = req.body.full_name;
    const slug = full_name.replace(/\s+/g, '-').toLowerCase();
    const qualification = req.body.qualification;
    const contact_no = req.body.contact_no;
    const position = req.body.position;
    const experience = req.body.experience;

    const errors = req.validationErrors();

    if (errors) {
        res.render('admin/add-teacher', {
            errors: errors
        });
    } else {
        Faculty.findOne({ slug: slug }, function (err, faculty) {
            if (faculty) {
                // req.flash('danger', 'This teacher is already added!');
                res.render('admin/add-teacher', {
                    full_name: full_name,
                    slug: slug,
                    qualification: qualification,
                    contact_no: contact_no,
                    position: position,
                    experience: experience,
                });
            } else {
                const faculty = new Faculty({
                    full_name: full_name,
                    slug: slug,
                    qualification: qualification,
                    contact_no: contact_no,
                    position: position,
                    experience: experience,
                    image: imageFile
                });

                faculty.save(function (err) {
                    if (err)
                        return console.log(err);

                    mkdirp('public/faculty_images/' + faculty._id, function (err) {
                        return console.log(err);
                    });

                    if (imageFile != '') {
                        const facultyImage = req.files.image;
                        const path = 'public/faculty_images/' + faculty._id + '/' + imageFile;

                        facultyImage.mv(path, function (err) {
                            return console.log(err);
                        });
                    }

                    // req.flash('success', 'Teacher added!');
                    res.redirect('/teachers');
                });
            }
        });

    }

});

module.exports = router;