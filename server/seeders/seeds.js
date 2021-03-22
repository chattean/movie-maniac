const { User, Movie, Category, Comment } = require('../models');
const db = require("../config/connections");
const faker = require('faker');

db.once('open', async () => {
    await Category.deleteMany();

    const categories = await Category.insertMany([
        { name: 'horror' },
        { name: 'comedy' },
        { name: 'drama' },
    ]);
    console.log('categories seeded');

    await Movie.deleteMany();

    const movies = await Movie.insertMany([
        {
            name: 'The Exorcist',
            category: categories[0]._id,
            image: 'The-Exorcist.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            name: 'The Conjuring',
            category: categories[0]._id,
            image: 'The-Conjuring.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            name: 'The Shining',
            category: categories[0]._id,
            image: 'The-Shining.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            name: 'Texas Chainsaw Massacre',
            category: categories[0]._id,
            image: 'Texas-Chainsaw.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            name: 'Sinister',
            category: categories[0]._id,
            image: 'Sinister.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            name: 'Bridesmaids',
            category: categories[1]._id,
            image: 'Bride-Maids.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            name: 'Friday',
            category: categories[1]._id,
            image: 'Friday.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            name: 'Ghost-Busters',
            category: categories[1]._id,
            image: 'Ghost-Busters.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            name: 'The-Mask',
            category: categories[1]._id,
            image: 'The-Mask.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            name: 'The-Godfather',
            category: categories[2]._id,
            image: 'The-Godfather.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            name: 'Shawshank Redemption',
            category: categories[2]._id,
            image: 'Shawshank-Redemption.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            name: 'Forrest Gump',
            category: categories[2]._id,
            image: 'Forrest-Gump.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            name: 'The Green Mile',
            category: categories[2]._id,
            image: 'Green-Mile.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            name: 'White-Chicks',
            category: categories[1]._id,
            image: 'White-Chicks.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            name: 'Knives-Out',
            category: categories[2]._id,
            image: 'Knives-Out.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
    ]);
    console.log('movies seeded');

    await User.deleteMany();

    const userData = [];

    for (let i = 0; i < 50; i += 1) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const userName = faker.internet.userName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        const watchList = [
            {
                movies: [movies[i]]
            }
        ]

        userData.push({ firstName, lastName, userName, email, password, watchList });
    }

    const createdUsers = await User.collection.insertMany(userData);
    console.log('users seeded');

    // create comments
    let createdComments = [];
    for (let i = 0; i < 100; i += 1) {
        const commentBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { userName, _id: userId } = createdUsers.ops[randomUserIndex];

        const createdComment = await Comment.create({ commentBody, userName: userName });

        const updatedUser = await User.updateOne(
            { _id: userId },
            { $push: { comment: createdComment._id } }
        );

        createdComments.push(createdComment);
    }
    console.log('comments seeded');

    process.exit();
});