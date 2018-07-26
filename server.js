const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'EghobamiennthonyA',
    password : '',
    database : 'smart-brain'
  }
});

// db.select('*').from('users').then(data => {
// 	// console.log(data);
// });

const app = express();

app.use(bodyParser.json());
app.use(cors());

// root
app.get('/', (req, res) => { res.send(database.users) })

// signin route
app.post('/signin', signin.handleSignIn(db, bcrypt));

// register route
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

// find a user route
app.get('/profile/:id',(req, res) => { profile.handleProfileGet(req, res, db) });

// image route/endpoint
app.put('/image', (req, res) => { image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => { image.handleAPICall(req, res)});

// // Load hash from your password DB.

app.listen(3001, () => {
	console.log('App is running on port 3001')
	console.log('App is running on port 3001')
});

/* 
Planning the API
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = new user
/profile/:userId --> GET = user
/image --> PUT --> user
 */