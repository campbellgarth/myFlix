const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

let users = [
    {
        id: 1,
        name: "Kim",
        favoriteMovies: []
    },
    {
        id: 2,
        name: "Jim",
        favoriteMovies: ["Inception"]
    }
]

let movies = [
    {
        'Title': 'Harry Potter and the Sorcerer\'s Stone',
        'Description': 'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.',
        'Year': 2001,
        'Genre': {
            'Name': 'Fantasy',
            'Description': 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds'
        },
        'Director': {
            'Name': 'Chris Columbus',
            'Birth year': 1958
        },
        'imgURL': 'https://www.imdb.com/title/tt0241527/mediaviewer/rm2105413120/?ref_=tt_ov_i'
    },
    {
        'Title': 'The Dark Knight',
        'Description': 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        'Year': 2008,
        'Genre': {
            'Name': 'Action',
            'Description': 'The action film is a film genre which predominantly features chase sequences, fights, shootouts, explosions, and stunt work.'
        },
        'Director': {
            'Name': 'Christopher Nolan',
            'Birth year': 1970
        },
        'imgURL': 'https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632/?ref_=tt_ov_i'
    },
    {
        'Title': 'The Hunger Games',
        'Description': 'Katniss Everdeen voluntarily takes her younger sister\'s place in the Hunger Games: a televised competition in which two teenagers from each of the twelve Districts of Panem are chosen at random to fight to the death.',
        'Year': 2012,
        'Genre': {
            'Name': 'Sci-Fi',
            'Description': 'Science fiction (or sci-fi or SF) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, mutants, interstellar travel, time travel, or other technologies.'
        },
        'Director': {
            'Name': 'Gary Ross',
            'Birth year': 1956
        },
        'imgURL': 'https://www.imdb.com/title/tt1392170/mediaviewer/rm2868031744/?ref_=tt_ov_i'
    },
    {
        'Title': 'Inception',
        'Description': 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
        'Year': 2010,
        'Genre': {
            'Name': 'Thriller',
            'Description': 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that evokes excitement and suspense in the audience.'
        },
        'Director': {
            'Name': 'Christopher Nolan',
            'Birth year': 1970
        },
        'imgURL': 'https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/?ref_=tt_ov_i'
    },
    {
        'Title': 'The Martian',
        'Description': 'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive and can survive until a potential rescue.',
        'Year': 2015,
        'Genre': {
            'Name': 'Sci-Fi',
            'Description': 'Science fiction (or sci-fi or SF) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, mutants, interstellar travel, time travel, or other technologies.'
        },
        'Director': {
            'Name': 'Ridley Scott',
            'Birth year': 1937
        },
        'imgURL': 'https://www.imdb.com/title/tt3659388/mediaviewer/rm1391324160/?ref_=tt_ov_i'
    },
    {
        'Title': 'My Cousin Vinny',
        'Description': 'Two New Yorkers accused of murder in rural Alabama while on their way back to college call in the help of one of their cousins, a loudmouth lawyer with no trial experience.',
        'Year': 1992,
        'Genre': {
            'Name': 'Comedy',
            'Description': 'A comedy film is a category of film that emphasizes humor. These films are designed to amuse audiences and make them laugh.'
        },
        'Director': {
            'Name': 'Jonathan Lynn',
            'Birth year': 1943
        },
        'imgURL': 'https://www.imdb.com/title/tt0104952/mediaviewer/rm1260442624/?ref_=tt_ov_i'
    },
    {
        'Title': 'Finding Nemo',
        'Description': 'After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.',
        'Year': 2003,
        'Genre': {
            'Name': 'Children',
            'Description': 'A children\'s film, or family film, is a film genre that generally relates to children in the context of home and family.'
        },
        'Director': {
            'Name': 'Andrew Stanton',
            'Birth year': 1965
        },
        'imgURL': 'https://www.imdb.com/title/tt0266543/mediaviewer/rm4042000896/?ref_=tt_ov_i'
    },
    {
        'Title': 'Pirates of the Caribbean: The Curse of the Black Pearl',
        'Description': 'Blacksmith Will Turner teams up with eccentric pirate "Captain" Jack Sparrow to save his love, the governor\'s daughter, from Jack\'s former pirate allies, who are now undead.',
        'Year': 2003,
        'Genre': {
            'Name': 'Fantasy',
            'Description': 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds'
        },
        'Director': {
            'Name': 'Gore Verbinski',
            'Birth year': 1964
        },
        'imgURL': 'https://www.imdb.com/title/tt0325980/mediaviewer/rm2487103488/?ref_=tt_ov_i'
    },
    {
        'Title': 'National Treasure',
        'Description': 'A historian races to find the legendary Templar Treasure before a team of mercenaries.',
        'Year': 2004,
        'Genre': {
            'Name': 'Thriller',
            'Description': 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that evokes excitement and suspense in the audience.'
        },
        'Director': {
            'Name': 'Jon Turteltaub',
            'Birth year': 1963
        },
        'imgURL': 'https://www.imdb.com/title/tt0368891/mediaviewer/rm751471616/?ref_=tt_ov_i'
    },
    {
        'Title': 'I am Legend',
        'Description': 'Years after a plague kills most of humanity and transforms the rest into monsters, the sole survivor in New York City struggles valiantly to find a cure.',
        'Year': 2007,
        'Genre': {
            'Name': 'Action',
            'Description': 'The action film is a film genre which predominantly features chase sequences, fights, shootouts, explosions, and stunt work.'
        },
        'Director': {
            'Name': 'Francis Lawrence',
            'Birth year': 1971
        },
        'imgURL': 'https://www.imdb.com/title/tt0480249/mediaviewer/rm2203650560/?ref_=tt_ov_i'
    }
]

app.use(morgan('common')); //logs page nav to terminal

app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

//return a list of all movies to users (read)
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

//return a list of a specific movie (read)
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.Title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no movie found');
    }
});
//return movies with a specific genre (read)
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no genre found');
    }
});
//return data about a director (read)
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.Director.Name === directorName).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no director found');
    }
});

//Allow new users to register (create)
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('users need names');
    }
})

//Allow users to update username (update)
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no user found');
    }
})

//add movie to favorites (create)
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {

        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s list`);
    } else {
        res.status(400).send('no user found');
    }
})

//Allow users to remove a movie from their list of favorites (delete)
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle)
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s list`);
    } else {
        res.status(400).send('no user found');
    }
})

//allow users to deregister (delete)
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter(user => user.id != id);
        res.status(200).send(`user ${id} has been deleted`);
    } else {
        res.status(400).send('no user found');
    }
})


app.use(express.static('public')); //allows to access html pages from public folder

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something isn\'t right...');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
