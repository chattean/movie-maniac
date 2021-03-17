const { User, Movie, Comment } = require('../models');
const db = require("../config/connections")

db.once('open', async () => {
    // await Category.deleteMany();

    // const categories = await Category.insertMany([
    //     { name: 'movies' },
    //     { name: 'Horror' },
    //     { name: 'Comedy' },
    //     { name: 'Drama' },
    // ]);
    console.log('categories seeded');

    await Movie.deleteMany();

    const Movies = await Movie.insertMany([
        {
            movieTitle: 'TheExorcist',
            category: 'horror',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'The-Conjuring',
            category: 'horror',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'The-Shining',
            category: 'horror',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'Texas-Chainsaw-Massacre',
            category: 'horror',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'Sinister',
            category: 'horror',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'Bridesmaids',
            category: 'comedy',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'Friday',
            category: 'comedy',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'Ghost-Busters',
            category: 'comedy',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'The-Mask',
            category: 'comedy',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'The-Godfather',
            category: 'drama',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'Shawshank-Redemption',
            category: 'drama',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'Forest-Gump',
            category: 'drama',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'The-Green-Mile',
            category: 'drama',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'White-Chicks',
            category: 'comedy',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'Knives-Out',
            category: 'drama',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
    ]);
    console.log('products seeded');
    await User.deleteMany();
    await User.create({
        firstName: 'Betty',
        lastName: 'Johnson',
        username: 'BettyJohnson',
        email: 'Betty@betty.com',
        password: 'Betty123.',
        watchList: [
            {

            }
        ]
    }),
        console.log('users seeded');

    process.exit();
});