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
            movieTitle: 'The Exorcist',
            category: 'horror',
            image: 'The-Exorcist.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'The Conjuring',
            category: 'horror',
            image: 'The-Conjuring.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'The Shining',
            category: 'horror',
            image: 'The-Shining.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'Texas Chainsaw Massacre',
            category: 'horror',
            image: 'Texas-Chainsaw.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'Sinister',
            category: 'horror',
            image: 'Sinister.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'Bridesmaids',
            category: 'comedy',
            image: 'Bride-Maids.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'Friday',
            category: 'comedy',
            image: 'Friday.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'Ghost-Busters',
            category: 'comedy',
            image: 'Ghost-Busters.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'The-Mask',
            category: 'comedy',
            image: 'The-Mask.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'The-Godfather',
            category: 'drama',
            image: 'The-Godfather.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'Shawshank Redemption',
            category: 'drama',
            image: 'Shawshank-Redemption.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'Forrest Gump',
            category: 'drama',
            image: 'Forrest-Gump.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'The Green Mile',
            category: 'drama',
            image: 'Green-Mile.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'White-Chicks',
            category: 'comedy',
            image: 'White-Chicks.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
        },
        {
            movieTitle: 'Knives-Out',
            category: 'drama',
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

            }
        ]
    }),
        console.log('users seeded');

    process.exit();
});