const express = require('express');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();
// const expressJwt = require('express-jwt');
// const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

// const requireSignin = expressJwt({
//     secret: process.env.JWT_SECRET,
//     algorithms: ['HS256'],
//     userProperty: 'auth'
// });

// const isAuth = function (req, res, next) {
//     let user = req.profile && req.auth && req.profile._id == req.auth._id;
//     if (!user) {
//         return res.status(403).json({
//             error: 'Access denied'
//         });
//     }
//     console.log(req.profile);
//     console.log(req.auth);
//     next();
// }

const Resource = require('../models/resource');

router.get('/', requireAuth, function (req, res) {
    res.send('resources here');
});

router.get('/:class_name', function (req, res) {

    const cl_name = req.params.class_name;
    // console.log(cl_name);
    Resource.find(function (err, resources) {

        const arrBig = [];
        resources.forEach(function (r) {
            if (r.class_name == cl_name) {
                const subjectArray = r.subjects[0];
                const arr = [];
                arr.push(subjectArray.subject_name);

                arrBig.push(arr[0]);


            }
        });

        const uniqueSub = [... new Set(arrBig)];
        console.log(uniqueSub);

        res.render('resources/subjects', {
            resources: resources,
            cl_name: cl_name,
            uniqueSub: uniqueSub
        });

        // console.log(arrBig);
    });
});

router.get('/:class_name/:sub_name', function (req, res) {
    const sub_name = req.params.sub_name;
    const cl_name = req.params.class_name;
    // console.log(sub_name);

    Resource.find(function (err, resources) {

        const arrBig = [];
        const chapterNo = [];
        const chapterImage = [];
        resources.forEach(function (r) {
            if (r.class_name == cl_name && r.subjects[0].subject_name == sub_name) {
                // const subjectArray = r.subjects[0];
                // const arr = [];
                // arr.push(subjectArray.subject_name);

                arrBig.push(r.subjects[0].chapters[0]);
                // chapterNo.push(r.subjects[0].chapters[0].chapter_no);
                // chapterImage.push(r.subjects[0].chapters[0].image);
            }
        });

        // const uniquechapter = [... new Set(arrBig)]; 
        // console.log(arrBig);
        // console.log(chapterNo);
        // console.log(chapterImage);

        res.render('resources/chapters', {
            resources: resources,
            cl_name: cl_name,
            sub_name: sub_name,
            arrBig: arrBig
        });

        // console.log(arrBig);
    });
});

module.exports = router;