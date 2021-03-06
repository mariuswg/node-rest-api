const express = require('express');
const router = express.Router();
// const cors = require('cors');
const Post = require('../models/posts');

// var corsOptions = {
//     origin: 'http://localhost:80',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   };

// Get all
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Get one
router.get('/:id', getPost, (req, res) => {
    res.json(res.post);
}); 

// Create one
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        body: req.body.body,
        author: req.body.author,
        tags: req.body.tags
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Updating one
router.patch('/:id', getPost, async (req, res) => {
    if(req.body.title != null) {
        res.post.title = req.body.title;
    }
    if(req.body.description != null) {
        res.post.description = req.body.description;
    }
    if(req.body.body != null) {
        res.post.body = req.body.body;
    }
    if(req.body.author != null) {
        res.post.author = req.body.author;
    }
    if(req.body.tags != null) {
        res.post.tags = req.body.tags;
    }
    try {
        const updatedPost = await res.post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one
router.delete('/:id', getPost, async (req, res) => {
    try {
        await res.post.remove();
        res.json({ message: 'Deleted post ' + res.post.title })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getPost(req, res, next) {
    let post;
    try {
        post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.post = post;
    next();
};

module.exports = router;