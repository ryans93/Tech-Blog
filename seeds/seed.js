const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userData = require('./users.json');
const blogpostData = require('./blogposts.json');
const commentData = require('./comments.json');


const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        const users = await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });

        const blogposts = await BlogPost.bulkCreate(blogpostData);

        const comments = await Comment.bulkCreate(commentData);

        console.log("Database seeded successfully")
        process.exit(0);
    }
    catch (e) {
        throw console.error("Error seeding database: " + e);
    }
};

seedDatabase();
