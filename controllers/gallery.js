const Gallery = require('../models/gallery');

exports.galleryById = function (req, res, next, id) {
    Gallery.findById(id).exec(function (err, gal) {
        if (err || !gal) {
            return res.status(400).json({
                error: 'Gallery not found'
            });
        }
        req.gallery = gallery;
        next();
    });
};

exports.read = function (req, res) {
    req.gallery.gallery_photo = undefined;
    return res.json(req.gallery);
};