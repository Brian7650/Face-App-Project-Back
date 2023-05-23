const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const dotenv = require('dotenv');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex ({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl:{ rejectUnauthorized: false },
      host: process.env.DATABASE_HOST,
      port: 5432,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PW,
      database: process.env.DATABASE_DB
    }
  });

const app = express();

app.use(cors())
app.use(express.json());// latest version of exressJS now comes with Body-Parser!!!!!!!!!!!

app.get('/', (req, res)=> { 
  res.send("db.users") 
});

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage (req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen (process.env.PORT || 3050, ()=> {
    console.log('app is running on port ${process.env.PORT}');
})
// console.log(process.env)