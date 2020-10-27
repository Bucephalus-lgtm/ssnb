const mongoose = require('mongoose');

const FacultySchema = mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    qualification: {
        type: String,
        required: true
    },
    contact_no: {
        type: Number,
    },
    position: {
        type: String,
        required: true
    },
    experience: {
        type: String,
    },
    image: {
        type: String,
    }
});

const Faculty = module.exports = mongoose.model('Faculty', FacultySchema);