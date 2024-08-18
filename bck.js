const express = require('express');
const bodyParser = require ('body-parser');
const bcrypt = require('bcrypt');
const cors = require ('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const { entries } = require('lodash');
const image  = require('./controllers/image');




const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5433,
      user: 'postgres',
      password: 'ezzeldeen19782002#',
      database: 'facedetectiondb',
    },
  });

    




const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) =>{res.send(database.user)});


//signin
app.post('/signin', (req,res) =>{ signin.handleSignin(req,res,db,bcrypt)}); //this way is called dependency injection 

//register
app.post('/register',register.handleRegister(db,bcrypt) ); //another way for dependency injection
//the handleRegister(db,bcrypt) function get called first then the register.js(req,res)


//searching
app.get('/profile/:id' , (req,res) => {profile.handleProfile(req,res,db)} );  


//score counter
app.put('/image' , (req,res) => {image.handleImage(req,res,db)});

app.post('/detectFaces', (req, res) => {image.handleImgURL( req,res )});

app.listen(3000 , () =>{
    console.log('its running');
});


//sign in -> post = success/failed
//register -> post = username & passowrd 
//profile : userid -> get= user
// image -> put --> user object etc...
