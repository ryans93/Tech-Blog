const router = require('express').Router();
const queries = require("./queries")

router.post("/login", async (req, res) => {
    try {
        console.log("in the login route")
        const user = await queries.getUser(req.body.username);
        if (!user) {
            res.status(400).json({ message: 'Incorrect email, please try again' });
            return;
        }
        //console.log(user)
        // Verify the posted password with the password store in the database
        const validPassword = await user.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password, please try again' });
            return;
        }

        // Create session variables based on the logged in user
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.loggedIn = true;
            res.status(200).json(user);
        });
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
})

router.post("/signUp", async (req, res) => {
    try {
        const user = await queries.createUser(req.body);

        if (!user) {
            res.status(400).json({ message: 'Error signing up. Please try different credentials.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.loggedIn = true;
            res.status(200).json(user);
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
})

router.get("/logout", (req, res) => {
    if (req.session.loggedIn) {
        // Remove the session variables
        req.session.destroy(() => {
            res.redirect("/");
        });
    } else {
        res.status(404).end();
    }
})

module.exports = router;