const mongoose = require('mongoose');

const ResourceSchema = mongoose.Schema({
    class_name: {
        type: String,
        required: true
    },
    class_slug: {
        type: String
    },
    subjects: [{
        subject_name: {
            type: String,
            required: true
        },
        subject_slug: {
            type: String
        },
        chapters: [{
            chapter_no: {
                type: Number
            },
            chapter_name: {
                type: String,
                required: true
            },
            chapter_slug: {
                type: String
            },
            image: {
                type: String
            },
            fileName: {
                type: String,
            },
            file: {
                type: String
            }
        }]
    }]
});

const Resource = module.exports = mongoose.model('Resource', ResourceSchema);