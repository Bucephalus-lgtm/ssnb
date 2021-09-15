const formidable = require('formidable');
const fs = require('fs');
const Gallery = require('../models/gallery');

exports.getAllPhotos = async (req, res) => {
    try {
        const posts = await Gallery.find().sort({
            date: -1
        });
        res.json(posts);
    } catch (err) {
        console.log(err.message);
        res.send(500).send('Server error!');
    }
}


exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }

        let product = new Gallery(fields);

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    err
                });
            }
            res.json(result);
        });
    });
};

// exports.galleryById = function (req, res, next, id) {
//     Gallery.findById(id).exec(function (err, gal) {
//         if (err || !gal) {
//             return res.status(400).json({
//                 error: 'Gallery not found'
//             });
//         }
//         req.gallery = gallery;
//         next();
//     });
// };

// exports.read = function (req, res) {
//     req.gallery.gallery_photo = undefined;
//     return res.json(req.gallery);
// };