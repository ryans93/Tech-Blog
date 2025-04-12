const router = require('express').Router();
const withAuth = require('../utils/auth');
const queries = require("./api/queries");

router.get("/", async (req, res) => {
    const postData = await queries.getAllPosts();

    if (!postData) {
        res.render("homepage", { loggedIn: req.session.loggedIn });
        return;
    }
    const posts = postData.map(post => post.get({ plain: true }))
    console.log(req.session.loggedIn)

    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
})

router.get("/dashboard", withAuth, async (req, res) => {
    const postData = await queries.getUserPosts(req.session.user_id);
    console.log(postData.length);
    if (!postData) {
        res.render("dashboard", {loggedIn: req.session.loggedIn});
        return;
    }
    const posts = postData.map(post => post.get({ plain: true }))
    res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
})

router.get("/login", (req, res) => {
    if (!req.session.loggedIn){
        res.render("login");
    }
    else {
        res.redirect("/dashboard");
    }
})

router.get("/signUp", (req, res) => {
    if (!req.session.loggedIn){
        res.render("signup");
    }
    else {
        res.redirect("/dashboard");
    }
})

router.get("/post/:id", async (req, res) => {
    const postData = await queries.getPost(req.params.id);

    if (!postData) {
        res.status(400).json({ message: 'Post not found' });
        return;
    }
    const post = postData.get({ plain: true })
    console.log(req.session.loggedIn)
    console.log(post)
    const usersPost = req.session.user_id == post.user_id;
    res.render("post", {post, loggedIn: req.session.loggedIn, usersPost: usersPost});
})

module.exports = router;
