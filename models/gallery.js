const mongoose = require('mongoose');

const GallerySchema = mongoose.Schema({
    name: {
        type: String
    },
    gallery_photo: {
        data: Buffer,
        contentType: String
    },
}, { timestamps: true });

const Gallery = module.exports = mongoose.model('Gallery', GallerySchema);