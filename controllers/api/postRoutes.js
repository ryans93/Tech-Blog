const router = require('express').Router();
const queries = require("./queries")

router.put("/:id", async (req, res) => {
    try {
        const post = await queries.upDatePost(req.params.id, req.body);

        if (!post) {
            res.status(400).json({ message: 'No post found. Unable to update.' });
            return;
        }

        res.status(200).json(post);
    }
    catch (err) {
        res.status(400).json(err);
    }
})

router.post("/", async (req, res) => {
    const postData = {
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    }
    try {
        const post = await queries.createPost(postData);

        if (!post) {
            res.status(400).json({ message: 'Unable to create post.' });
            return;
        }

        res.status(200).json(post);
    }
    catch (err) {
        res.status(400).json(err);
    }
})

router.post("/comment", async (req, res) => {
    const commentData = {
        content: req.body.content,
        post_id: req.body.post_id,
        user_id: req.session.user_id
    }
    try {
        const comment = await queries.createComment(commentData);

        if (!comment) {
            res.status(400).json({ message: 'Unable to create comment.' });
            return;
        }

        res.status(200).json(comment);
    }
    catch (err) {
        res.status(400).json(err);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const post = await queries.deletePost(req.params.id);

        if (!post) {
            res.status(400).json({ message: 'No post found. Unable to delete.' });
            return;
        }

        res.status(200).json(post);
    }
    catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;