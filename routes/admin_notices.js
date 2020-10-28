const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());

const Notice = require('../models/notice');
const mkdirp = require('mkdirp');

app.use(express.static('public'));

router.get('/list', function (req, res) {
    Notice.find({}).exec(function (err, notices) {
        res.render('notices', {
            notices: notices,
        });
    });
});

router.get('/add-notice', function (req, res) {
    res.render('admin/add-notice');
});

router.post('/add-notice', function (req, res) {
    console.log(req.files);
    var title = req.body.title;

    var file = typeof req.files.notice !== 'undefined' ? req.files.notice.name : '';

    // req.checkBody('file', 'You must upload a file!!!').isDocument(file);

    console.log(file);

    var errors = req.validationErrors();

    if (errors) {
        console.log(errors);
    } else {
        Notice.findOne({ title: title }, function (err, f) {
            if (f) {
                throw f;
                // req.flash('danger', 'A file with this name exists already, choose another.');
            } else {
                var notice = new Notice({
                    title: title,
                    file: file
                });

                notice.save(function (err) {
                    if (err) {
                        return console.log(err);
                    }

                    mkdirp('public/notices/' + notice._id, function (err) {
                        return console.log(err);
                    });

                    if (file != '') {
                        const fileDir = req.files.notice;
                        const path = 'public/notices/' + notice._id + '/' + title + '.pdf';

                        console.log(path);

                        fileDir.mv(path, function (err) {
                            return console.log(err);
                        });
                    }

                    // req.flash('success', 'Notice added!');
                    res.redirect('/admin/notices/list');

                });
            }
        });
    }

});


// File.find({}).exec(function (err, files) {

//     files.forEach(function (file) {
//         router.get('/download/' + file._id, function (req, res) {

//             const filePath = path.join(__dirname, '../public/product_files/' + file._id + '/' + file.fileName + '.pdf');
//             res.download(filePath, function (err) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log('Successfully downloaded!');
//                 }
//             });

//         });
//     });
// });

module.exports = router;