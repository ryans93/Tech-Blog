const router = require('express').Router();
const queries = require("./queries")

router.post("/login", async (req, res) => {
    try {
        const user = queries.getUser(req.body.username);
        if (!user) {
            res.status(400).json({ message: 'Incorrect email, please try again' });
            return;
        }

        // Verify the posted password with the password store in the database
        const validPassword = await user.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password, please try again' });
            return;
        }

        // Create session variables based on the logged in user
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            res.redirect("/dashboard");
        });
    }
    catch {
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
            req.session.logged_in = true;
            res.redirect("/dashboard");
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
})

router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        // Remove the session variables
        req.session.destroy(() => {
            res.redirect("/homepage");
        });
    } else {
        res.status(404).end();
    }
})

module.exports = router;