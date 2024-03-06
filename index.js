const express = require('express'),
    morgan = require('morgan');
const app = express();

let topMovies = [
    {
        title: 'Harry Potter and the Sorcerer\'s Stone',
        director: 'Chris Columbus'
    },
    {
        title: 'The Dark Knight',
        director: 'Christopher Nolan'
    },
    {
        title: 'The Hunger Games',
        director: 'Gary Ross'
    },
    {
        title: 'Inception',
        director: 'Christopher Nolan'
    },
    {
        title: 'The Martian',
        director: 'Ridley Scott'
    },
    {
        title: 'My Cousin Vinny',
        director: 'Jonathan Lynn'
    },
    {
        title: 'Finding Nemo',
        director: 'Andrew Stanton'
    },
    {
        title: 'Pirates of the Caribbean: The Curse of the Black Pearl',
        director: 'Gore Verbinski'
    },
    {
        title: 'National Treasure',
        director: 'Jon Turteltaub'
    },
    {
        title: 'I am Legend',
        director: 'Francis Lawrence'
    }
]

app.use(morgan('common')); //logs page nav to terminal

app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.use(express.static('public')); //allows to access html pages from public folder

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something isn\'t right...');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
