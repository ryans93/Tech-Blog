const router = require('express').Router();
const withAuth = require('../utils/auth');
const queries = require("./api/queries");

router.get("/", async (req, res) => {
    const posts = await queries.getAllPosts();
    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
})

router.get("/dashboard", withAuth, async (req, res) => {
    const posts = await queries.getUserPosts(req.session.user_id);
    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
})

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/post:id", async (req, res) => {
    const post = await queries.getPost(req.params.id);
    res.render("post", {post, loggedIn: req.session.loggedIn});
})

module.exports = router;
