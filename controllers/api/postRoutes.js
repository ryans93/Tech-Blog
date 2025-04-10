const router = require('express').Router();
const queries = require("./queries")

router.put("/:id", async (req, res) => {
    try {
        const post = await queries.upDatePost(req.params.id, req.body);

        if (!post) {
            res.status(400).json({ message: 'No post found. Unable to update.' });
            return;
        }

        res.redirect("/dashboard");
    }
    catch (err) {
        res.status(400).json(err);
    }
})

router.post("/", async (req, res) => {
    try {
        const post = await queries.createPost(req.body);

        if (!post) {
            res.status(400).json({ message: 'Unable to create post.' });
            return;
        }

        res.redirect("/dashboard");
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

        res.redirect("/dashboard");
    }
    catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;