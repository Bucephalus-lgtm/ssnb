const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
    class_: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    subjects: [{
        sub_name: {
            type: String,
        },
        sub_no: {
            type: String,
        }
    }]
});

const Subject = module.exports = mongoose.model('Subject', SubjectSchema);