const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const Post = require('../models/Post');

const secret = 'sdwadasdasdasdwqd23314234de3c322f3';

async function createPost(req, res) {
    try {
        upload.single('file')(req, res, async (err) => {
            if (err) {
                // Handle any upload errors here
                console.error(err);
                return res.status(500).json({ message: 'File upload failed' });
            }

            const { originalname, path } = req.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            const newPath = path + '.' + ext;
            fs.renameSync(path, newPath);

            const { token } = req.cookies;

            jwt.verify(token, secret, {}, async (err, info) => {
                if (err) {
                    console.error(err);
                    return res.status(401).json({ message: 'Authentication failed' });
                }

                const { title, summary, content } = req.body;
                const postDoc = await Post.create({
                    title,
                    summary,
                    content,
                    cover: newPath,
                    author: info.id,
                });

                return res.status(200).json({ postDoc });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getPosts(req, res) {
    try {
        const posts = await Post.find().populate('author', [ 'username' ]).sort({ createdAt: -1}).limit(20);
        return res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function getPostById(req,res) {

}

module.exports = {
    createPost,
    getPosts,
    getPostById
};