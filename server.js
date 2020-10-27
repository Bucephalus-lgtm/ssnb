const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// const url = 'mongodb://localhost/ssnb';
const url = 'mongodb+srv://amare:amare@mycluster.0e2la.gcp.mongodb.net/ssnb?retryWrites=true&w=majority';

mongoose
    .connect(
        url,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const indexRoutes = require('./routes/index');
const about = require('./routes/about');
const contact = require('./routes/contacts');

app.use('/', indexRoutes);
app.use('/about', about);
app.use('/contacts', contact);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
});