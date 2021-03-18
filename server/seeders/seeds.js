const { User, Movie, Category } = require('../models');
const db = require("../config/connections")

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
    await User.create({
        firstName: 'Betty',
        lastName: 'Johnson',
        username: 'BettyJohnson',
        email: 'Betty@betty.com',
        password: 'Betty123.',
        watchList: [
            {
                movies: [movies[0]._id, movies[2]._id, movies[1]._id]
            }
        ]
    }),
        console.log('users seeded');

    process.exit();
});