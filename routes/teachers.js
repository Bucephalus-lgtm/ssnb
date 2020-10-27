const express = require('express');
const router = express.Router();

const Faculty = require('../models/faculty');

router.get('/', function (req, res) {
    Faculty.find(function (err, faculties) {
        if (err)
            console.log(err);

        res.render('teachers', {
            faculties: faculties
        });
    });
});

router.get('/details/:slug', function(req, res){
    // console.log(req.params.slug);
    const slug = req.params.slug;
    Faculty.findOne({slug: slug}, function (err, faculties) {
        // console.log(faculties.full_name);
        if (err)
            return console.log(err);

        res.render('details', {
            faculties: faculties
        });
    });
});

module.exports = router;