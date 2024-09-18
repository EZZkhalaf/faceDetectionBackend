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
const { Pool } = require('pg');



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

  const db2 =  new Pool({
    user : "postgres" ,
    password:"ezzeldeen19782002#" ,
    port:5433,
    database:'todolist'
  })

  
  
  
  
  const app = express();
  
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) =>{
    res.send(database.user);
    const authToken = req.cookies.authToken;

  if (authToken) {
    // Validate the authToken, check if it's valid and belongs to a logged-in user
    res.send('Welcome to your dashboard!');
  } else {
    res.redirect('/login'); // Redirect to login if no valid token
  }
});


//signin
app.post('/signin', (req,res) =>{ signin.handleSignin(req,res,db,bcrypt )}); //this way is called dependency injection 

//register
app.post('/register',register.handleRegister(db,bcrypt) ); //another way for dependency injection
//the handleRegister(db,bcrypt) function get called first then the register.js(req,res)


//searching
app.get('/profile/:id' , (req,res) => {profile.handleProfile(req,res,db)} );  


//score counter
app.put('/image' , (req,res) => {image.handleImage(req,res,db)});

app.post('/detectFaces', (req, res) => {image.handleImgURL( req,res )});





// create todo
app.post('/todos' , async(req,res) =>{
  
  try{
      const {description} = req.body;
      const newTodo = await db2.query("INSERT INTO todo(description) VALUES($1) RETURNING *"
           , [description]); //$1 is the vaues pf description
      res.json(newTodo.rows[0]);
  } catch(err){
      console.error(err.message)
  }
});


//get all todo 
app.get('/todos' , async(req,res)=>{
  try{
      const allTodo = await db2.query("SELECT * FROM todo");
      res.json(allTodo.rows);
  } catch(err){
      console.error("error in app.get")
  }
})


//get a todo
app.get('/todos/:id' , async(req,res)=>{
  try{
      const {id} = req.params;
      const todo = await db2.query("SELECT * FROM todo WHERE todo_id = $1" 
          , [id]);
      res.json(todo.rows[0]);
  }catch(err){
      console.error(err.message)
  }
})


//update todo
app.put('/todos/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { description } = req.body;

      if (!description) {
          return res.status(400).json({ error: "Description is required" });
      }

      const upTodo = await db2.query(
          "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
          [description, id]
      );

      if (upTodo.rowCount === 0) {
          return res.status(404).json({ error: "Todo not found" });
      }

      res.status(200).json({ message: "Todo updated", todo: upTodo.rows[0] });
  } catch (err) {
      console.error(err.message);
      res.status(500).json("error in app.put");
  }
});


//delete todo 
app.delete('/todos/:id' ,async(req,res) =>{
  try{
      const {id} = req.params;
      const deletedTodo = await db2.query("DELETE FROM todo WHERE todo_id = $1" , [id]);
      res.json('todo deleted ');
  }catch(err){
      console.error(err.message);
  }
})

app.listen(3000 , () =>{
    console.log('its running');
});

