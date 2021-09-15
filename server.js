require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

// const url = 'mongodb://localhost/ssnb';
const url = 'mongodb+srv://localtrend:localtrend@cluster0.njbpr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose
    .connect(
        url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.json());

app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    },
    customValidators: {
        isImage: function (value, filename) {
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case '.png':
                    return '.png';
                case '':
                    return '.jpg';
                default:
                    return false;
            }
        },

        isDocument: function (value, filename) {
            const extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.pdf':
                    return '.pdf';
                case '.docx':
                    return '.docx'
                case '':
                    return '.pdf';
                default:
                    return false;
            }
        }
    }
}));

app.use(fileUpload());

const indexRoutes = require('./routes/index');
const about = require('./routes/about');
const contact = require('./routes/contacts');
const teacher = require('./routes/teachers');
const adminTeacher = require('./routes/admin_teachers');
const notice = require('./routes/notices');
const adminNotices = require('./routes/admin_notices');
const adminResources = require('./routes/admin_resources');
const resources = require('./routes/resources');
const gallery = require('./routes/gallery');
const user = require('./routes/auth');
const { checkUser } = require('./middleware/auth');
const feeStructure = require('./routes/fee-structure');
const allAdminLinks = require('./routes/admin-allowance');
const adminGallery = require('./routes/admin_gallery');

app.get('*', checkUser);

app.use('/', indexRoutes);
app.use('/about', about);
app.use('/contact', contact);
app.use('/teachers', teacher);
app.use('/admin/teachers', adminTeacher);
app.use('/api', notice);
app.use('/admin/notices', adminNotices);
app.use('/admin/resources', adminResources);
app.use('/resources', resources);
app.use('/gallery', gallery);
app.use('/users', user);
app.use('/fee-structure', feeStructure);
app.use('/admin', allAdminLinks);
app.use('/admin/gallery', adminGallery);

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
});