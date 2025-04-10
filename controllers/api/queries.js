const { User, BlogPost, Comment } = require("../../models")

const queries = {
    getAllPosts: async () => {
        const postData = await BlogPost.findAll({
            include: [{
                model: User,
                attributes: ['username']  // fields from Post to include
            }]
        }).catch((err) => {
            res.json(err);
        });
        const posts = postData.map(post => post.get({ plain: true }));
        return posts;
    },
    getUserPosts: async (id) => {
        const postData = await BlogPost.findAll({
            where: {
                id: id
            }
        }).catch((err) => {
            res.json(err);
        });
        const posts = postData.map(post => post.get({ plain: true }));
        return posts;
    },
    getPost: async (id) => {
        const postData = await BlogPost.findByPk(id, {
            include: [{
                model: Comment
            }]
        }).catch((err) => {
            res.json(err);
        });
        return post.get({ plain: true });
    },
    createPost: async (postData) => {
        const post = await BlogPost.create(postData).catch((err) => {
            res.json(err);
        });
        return post;
    },
    upDatePost: async (id, postData) => {
        const post = await BlogPost.update(postData, {
            where: {
                id: id
            }
        }).catch((err) => {
            res.json(err);
        })
        return post;
    },
    deletePost: async (id) => {
        const post = await BlogPost.destroy({
            where: {
                id: id
            }
        }).catch((err) => {
            res.json(err);
        });
        return post;
    },
    getUser: async (username) => {
        const userData = await User.findOne({
            where: {
                username: username
            }
        }).catch((err) => {
            res.json(err);
        });
        return userData;
    },
    createUser: async (userData) => {
        const user = await User.create(userData).catch((err) => {
            res.json(err);
        });
        return user;
    }
}

module.exports = queries;