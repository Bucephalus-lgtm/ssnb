const mongoose = require('mongoose');
const express = require('express');

const NoticeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    file: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const Notice = module.exports = mongoose.model('Notice', NoticeSchema);