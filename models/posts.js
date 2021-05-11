const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: true
    },
    date_posted: {
        type: Date,
        required: true,
        default: Date.now
    },
    author: {
        type: String,
        required: false
    },
    tags: [{type: String}]
});

module.exports = mongoose.model('Post', postSchema);