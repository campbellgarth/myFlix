//run nodemon in terminal with npm run dev
const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    mongoose = require('mongoose'),
    Models = require('./models.js'),
    Movies = Models.Movie,
    Users = Models.User,
    app = express();

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// let users = [
//     {
//         id: 1,
//         name: "Kim",
//         favoriteMovies: []
//     },
//     {
//         id: 2,
//         name: "Jim",
//         favoriteMovies: ["Inception"]
//     }
// ]

// let users2 = [
//     {
//         Username: "StevenUniverse",
//         Password: "crystalgems3",
//         Email: "cookiecat@gmail.com",
//         Birthday: new Date("2004-05-01")

//     },

//     {
//         Username: "AvatarAang",
//         Password: "FlameoHotman",
//         Email: "appamomo@gmail.com",
//         Birthday: new Date("2004-02-18")
//     },

//     {
//         Username: "HarryPotter",
//         Password: "TheChosenOne",
//         Email: "hogwarts@gmail.com",
//         Birthday: new Date("1989-07-31")
//     },

//     {
//         Username: "JihyoTwice",
//         Password: "KillinMeGood",
//         Email: "twiceleader@gmail.com",
//         Birthday: new Date("1997-02-01")
//     },

//     {
//         Username: "SpongebobSquarepants",
//         Password: "ImReady",
//         Email: "goofygoober@gmail.com",
//         Birthday: new Date("1996-07-14")
//     }

// ]

// let movies = [
//     {
//         'Title': 'Harry Potter and the Sorcerer\'s Stone',
//         'Description': 'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.',
//         'Year': 2001,
//         'Genre': {
//             'Name': 'Fantasy',
//             'Description': 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds'
//         },
//         'Director': {
//             'Name': 'Chris Columbus',
//             'Bio': 'Chris Joseph Columbus is an American filmmaker. Born in Spangler, Pennsylvania, Columbus studied film at Tisch School of the Arts where he developed an interest in filmmaking.',
//             'Birthdate': '1958-09-10'
//         },
//         'imgURL': 'https://www.imdb.com/title/tt0241527/mediaviewer/rm2105413120/?ref_=tt_ov_i',
//         'Featured': true
//     },
//     {
//         'Title': 'The Dark Knight',
//         'Description': 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
//         'Year': 2008,
//         'Genre': {
//             'Name': 'Action',
//             'Description': 'The action film is a film genre which predominantly features chase sequences, fights, shootouts, explosions, and stunt work.'
//         },
//         'Director': {
//             'Name': 'Christopher Nolan',
//             'Bio': 'Christopher Edward Nolan CBE is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century. His films have grossed more than $6 billion worldwide, ranking him amongst the highest-grossing directors in history.',
//             'Birthdate': '1970-07-30'
//         },
//         'imgURL': 'https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632/?ref_=tt_ov_i',
//         'Featured': false
//     },
//     {
//         'Title': 'The Hunger Games',
//         'Description': 'Katniss Everdeen voluntarily takes her younger sister\'s place in the Hunger Games: a televised competition in which two teenagers from each of the twelve Districts of Panem are chosen at random to fight to the death.',
//         'Year': 2012,
//         'Genre': {
//             'Name': 'Sci-Fi',
//             'Description': 'Science fiction (or sci-fi or SF) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, mutants, interstellar travel, time travel, or other technologies.'
//         },
//         'Director': {
//             'Name': 'Gary Ross',
//             'Bio': 'Gary Ross is an American filmmaker. He is best known for writing and directing the fantasy comedy-drama film Pleasantville, the sports drama film Seabiscuit, the sci-fi action film The Hunger Games, and the heist comedy film Ocean\'s 8. Ross has been nominated for four Academy Awards.',
//             'Birthdate': '1956-11-03'
//         },
//         'imgURL': 'https://www.imdb.com/title/tt1392170/mediaviewer/rm2868031744/?ref_=tt_ov_i',
//         'Featured': true
//     },
//     {
//         'Title': 'Inception',
//         'Description': 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
//         'Year': 2010,
//         'Genre': {
//             'Name': 'Thriller',
//             'Description': 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that evokes excitement and suspense in the audience.'
//         },
//         'Director': {
//             'Name': 'Christopher Nolan',
//             'Bio': 'Christopher Edward Nolan CBE is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century. His films have grossed more than $6 billion worldwide, ranking him amongst the highest-grossing directors in history.',
//             'Birthdate': '1970-07-30'
//         },
//         'imgURL': 'https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/?ref_=tt_ov_i',
//         'Featured': false
//     },
//     {
//         'Title': 'The Martian',
//         'Description': 'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive and can survive until a potential rescue.',
//         'Year': 2015,
//         'Genre': {
//             'Name': 'Sci-Fi',
//             'Description': 'Science fiction (or sci-fi or SF) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, mutants, interstellar travel, time travel, or other technologies.'
//         },
//         'Director': {
//             'Name': 'Ridley Scott',
//             'Bio': 'Sir Ridley Scott GBE is an English filmmaker. He is best known for directing films in the science fiction, crime and historical drama genres. His work is known for its atmospheric and highly concentrated visual style.',
//             'Birthdate': '1937-11-30'
//         },
//         'imgURL': 'https://www.imdb.com/title/tt3659388/mediaviewer/rm1391324160/?ref_=tt_ov_i',
//         'Featured': true
//     },
//     {
//         'Title': 'My Cousin Vinny',
//         'Description': 'Two New Yorkers accused of murder in rural Alabama while on their way back to college call in the help of one of their cousins, a loudmouth lawyer with no trial experience.',
//         'Year': 1992,
//         'Genre': {
//             'Name': 'Comedy',
//             'Description': 'A comedy film is a category of film that emphasizes humor. These films are designed to amuse audiences and make them laugh.'
//         },
//         'Director': {
//             'Name': 'Jonathan Lynn',
//             'Bio': 'Jonathan Adam Lynn is an English stage and film director, producer, writer, and actor. He directed the comedy films Clue, Nuns on the Run, My Cousin Vinny, and The Whole Nine Yards. He also co-created and co-wrote the television series Yes Minister.',
//             'Birthdate': '1943-04-03'
//         },
//         'imgURL': 'https://www.imdb.com/title/tt0104952/mediaviewer/rm1260442624/?ref_=tt_ov_i',
//         'Featured': true
//     },
//     {
//         'Title': 'Finding Nemo',
//         'Description': 'After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.',
//         'Year': 2003,
//         'Genre': {
//             'Name': 'Children',
//             'Description': 'A children\'s film, or family film, is a film genre that generally relates to children in the context of home and family.'
//         },
//         'Director': {
//             'Name': 'Andrew Stanton',
//             'Bio': 'Andrew Ayers Stanton is an American filmmaker and voice actor based at Pixar, which he joined in 1990.',
//             'Birthdate': '1965-12-03'
//         },
//         'imgURL': 'https://www.imdb.com/title/tt0266543/mediaviewer/rm4042000896/?ref_=tt_ov_i',
//         'Featured': false
//     },
//     {
//         'Title': 'Pirates of the Caribbean: The Curse of the Black Pearl',
//         'Description': 'Blacksmith Will Turner teams up with eccentric pirate "Captain" Jack Sparrow to save his love, the governor\'s daughter, from Jack\'s former pirate allies, who are now undead.',
//         'Year': 2003,
//         'Genre': {
//             'Name': 'Fantasy',
//             'Description': 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.'
//         },
//         'Director': {
//             'Name': 'Gore Verbinski',
//             'Bio': 'Gregor Justin "Gore" Verbinski is an American film director. He is best known for directing Mouse Hunt, The Ring, the first three Pirates of the Caribbean films, and Rango. For his work on Rango, Verbinski won both the Academy Award and BAFTA Award for Best Animated Film.',
//             'Birthdate': '1964-03-16'
//         },
//         'imgURL': 'https://www.imdb.com/title/tt0325980/mediaviewer/rm2487103488/?ref_=tt_ov_i',
//         'Featured': false
//     },
//     {
//         'Title': 'National Treasure',
//         'Description': 'A historian races to find the legendary Templar Treasure before a team of mercenaries.',
//         'Year': 2004,
//         'Genre': {
//             'Name': 'Thriller',
//             'Description': 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that evokes excitement and suspense in the audience.'
//         },
//         'Director': {
//             'Name': 'Jon Turteltaub',
//             'Bio': 'Jonathan Charles Turteltaub (born August 8, 1963) is an American film director and producer who directed successful mainstream films for Walt Disney Studios.',
//             'Birthdate': '1963-08-08'
//         },
//         'imgURL': 'https://www.imdb.com/title/tt0368891/mediaviewer/rm751471616/?ref_=tt_ov_i',
//         'Featured': false
//     },
//     {
//         'Title': 'I am Legend',
//         'Description': 'Years after a plague kills most of humanity and transforms the rest into monsters, the sole survivor in New York City struggles valiantly to find a cure.',
//         'Year': 2007,
//         'Genre': {
//             'Name': 'Action',
//             'Description': 'The action film is a film genre which predominantly features chase sequences, fights, shootouts, explosions, and stunt work.'
//         },
//         'Director': {
//             'Name': 'Francis Lawrence',
//             'Bio': 'Francis Lawrence is an American filmmaker and producer. After establishing himself as a director of music videos and commercials, Lawrence made his feature-length directorial debut with the superhero thriller Constantine and has since directed the post-apocalyptic horror film I Am Legend and the romantic drama Water for Elephants.',
//             'Birthdate': '1971-03-26'
//         },
//         'imgURL': 'https://www.imdb.com/title/tt0480249/mediaviewer/rm2203650560/?ref_=tt_ov_i',
//         'Featured': false
//     }
// ]

app.use(morgan('common')); //logs page nav to terminal

app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

//return a list of all movies to users (read)
app.get('/movies', async (req, res) => {
    await Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//return a list of a specific movie (read)
app.get('/movies/:Moviename', async (req, res) => {
    await Movies.findOne({ Title: req.params.Moviename })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});
//return movies with a specific genre (read)
app.get('/movies/genre/:genreName', async (req, res) => {
    await Movies.find({'Genre.Name': req.params.genreName})
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});
//return data about a genre (read)
app.get('/movies/genres/:genreName', async (req, res) => {
    await Movies.findOne({ 'Genre.Name': req.params.genreName })
        .then((movie) => {
            res.status(200).json(movie.Genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//return data about a director (read)
app.get('/movies/directors/:directorName', async (req, res) => {
    await Movies.findOne({ 'Director.Name': req.params.directorName })
        .then((movie) => {
            res.status(200).json(movie.Director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Allow new users to register (create)
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', async (req, res) => {
    await Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + ' already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) => { res.status(201).json(user) })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//return a list of all users (read)
app.get('/users', async (req, res) => {
    await Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});
//get a user by username
app.get('/users/:Username', async (req, res) => {
    await Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});
//Allow users to update username (update)
app.put('/users/:Username', async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
        { new: true })//ensures updated document is returned instead of original
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        })
});

//add movie to favorites (create)
app.post('/users/:Username/movie/:MovieID', async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavoriteMovies: req.params.MovieID }
    },
        { new: true })
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Allow users to remove a movie from their list of favorites (delete)
app.delete('/users/:Username/movie/:MovieID', async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $pull: { FavoriteMovies: req.params.MovieID }
    },
        { new: true })
        .then((updatedUser) => {
            res.json("Movie was removed from " + updatedUser.Username + "'s list");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//allow users to deregister (delete)
app.delete('/users/:Username', async (req, res) => {
    await Users.findOneAndDelete({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

app.use(express.static('public')); //allows to access html pages from public folder

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something isn\'t right...');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
