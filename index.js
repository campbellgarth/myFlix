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

// mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true }); //for local testing
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { check, validationResult } = require('express-validator');
const cors = require('cors');
let allowedOrigins = [
  'http://localhost:8080',
  'https://myflixmovies-72c1f6d2bace.herokuapp.com',
];
//set CORS to only specific origins
// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) === -1) { //if origin isn't found in list of allowed origins
//             let message = 'The CORS policy for this application doesn\'t allow access from origin ' + origin;
//             return callback(new Error(message), false);
//         }
//         return callback(null, true);
//     }
// }));

app.use(cors()); //allows requests from all origins instead of above
let auth = require('./auth')(app); //use auth.js code (app) argument allows express to be available in auth.js as well
const passport = require('passport');
require('./passport'); //imports passport.js

app.use(morgan('common')); //logs page nav to terminal

/**
 * Returns a welcome message when visiting the site without an endpoint
 * @returns {string} Welcome message
 */
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

/**
 * Returns a list of all movies to users under the endpoint '/movies'
 * @async
 * @returns {Array<Object>} List of movies
 */
app.get(
  '/movies',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    await Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

/**
 * Returns one movie users under the endpoint '/movies/:Moviename'
 * @async
 * @param {string} Moviename - The title of the movie
 * @returns {Object} movie
 */
app.get(
  '/movies/:Moviename',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    await Movies.findOne({ Title: req.params.Moviename })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

/**
 * Returns a list of movies with a specific genre to users under the endpoint '/movies/genre/:genreName'
 * @async
 * @param {string} genreName - The name of the genre
 * @returns {Array<Object>} movies
 */
app.get(
  '/movies/genre/:genreName',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    await Movies.find({ 'Genre.Name': req.params.genreName })
      .then((movie) => {
        res.status(200).json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

/**
 * Returns a genre object to users under the endpoint '/movies/genres/:genreName'
 * @async
 * @param {string} genreName - The name of the genre
 * @returns {Object} genre
 */
app.get(
  '/movies/genres/:genreName',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    await Movies.findOne({ 'Genre.Name': req.params.genreName })
      .then((movie) => {
        res.status(200).json(movie.Genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

/**
 * Returns a director object to users under the endpoint '/movies/directors/:directorName'
 * @async
 * @param {string} directorName - The name of the director
 * @returns {Object} director
 */
app.get(
  '/movies/directors/:directorName',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    await Movies.findOne({ 'Director.Name': req.params.directorName })
      .then((movie) => {
        res.status(200).json(movie.Director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

/**
 * Allow new users to register under the endpoint '/users'
 *@param {number} ID - user ID
 * @param {string} Username - Username
 * @param {string} Password - Password
 * @param {string} Email - User's Email
 * @param {date} Birthday - User's birthday
 * @async
 * @returns {Object} user
 */
app.post(
  '/users',
  //checks that username is meeting features of username
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check(
      'Username',
      'Username contains non alphanumeric characters-not allowed.'
    ).isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
  ],
  async (req, res) => {
    //check validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  }
);

/**
 * Returns a list of all users under the endpoint '/users'
 * @async
 * @returns {Array<Object>} List of users
 */
app.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    await Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);
/**
 * Returns a user under the endpoint '/users/:Username'
 * @async
 * @param {string} Username - username of requested user
 * @returns {Object} user
 */
app.get(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    await Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);
/**
 * Allow new users to update user under the endpoint '/users/:Username'
 * @param {string} Username - username
 * @param {string} Password - password
 * @param {string} Email - email
 * @param {date} Birthday -date of birther
 * @async
 * @returns {Object} Updated user
 */
app.put(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check(
      'Username',
      'Username contains non alphanumeric characters-not allowed.'
    ).isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
  ],
  async (req, res) => {
    //check validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    //condition to check username
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send('Permission denied');
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }
    ) //ensures updated document is returned instead of original
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

/**
 * Allows users to add a movie to their favorites under endpoint '/users/:Username/movie/:MovieID'
 * @async
 * @param {string} Username - username
 * @param {string} MovieID - The ID of the movie user wishes to favorite
 * @returns {Object} Updated user
 */
app.post(
  '/users/:Username/movie/:MovieID',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send('Permission denied');
    }

    try {
      const user = await Users.findOne({ Username: req.params.Username });

      if (!user) {
        return res.status(404).send('User not found');
      }

      if (user.FavoriteMovie.includes(req.params.MovieID)) {
        return res.status(400).send('Movie is already in the favorites list');
      }

      user.FavoriteMovie.push(req.params.MovieID);
      const updatedUser = await user.save();

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    }
  }
);

/**
 * Allows users to remove a movie from their favorites under endpoint '/users/:Username/movie/:MovieID'
 * @async
 * @param {string} Username - username
 * @param {string} MovieID - The ID of the movie user wishes to unfavorite
 * @returns {Object} Updated user
 */
app.delete(
  '/users/:Username/movie/:MovieID',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send('Permission denied');
    }
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $pull: { FavoriteMovie: req.params.MovieID },
      },
      { new: true }
    )
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

/**
 * Allows users to delete their profile under endpoint '/users/:Username'
 * @async
 * @param {string} Username - username
 * @returns {string} user deleted
 */
app.delete(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send('Permission denied');
    }
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
  }
);

app.use(express.static('public')); //allows to access html pages from public folder

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something isn't right...");
});
const port = process.env.PORT || 8080; //allows port number to change to a pre-configured port number, else uses default 8080.
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
