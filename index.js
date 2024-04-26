const express = require('express')
const app = express();
const cors = require('cors')
app.use(cors());

const dbConnection = require('./config/database');
const { default: mongoose } = require('mongoose');
const {registerUser,loginUser} = require('./routing/user')
const {registerValidation,loginValidation} = require('./middleware/validation')
const db = mongoose.connection
app.use(express.json())
require('dotenv').config();

dbConnection();

db.on('connected', function(){
    console.log("connected");
})
db.on('error', function(err){
   console.log(err)
})
db.on('disconnected', function(){
    console.log("disconnected");
})

app.post('/register',registerValidation,async(req,res)=>{
    try{
      const savedUSer = await registerUser(req,res);
      console.log("new user added successfully",savedUSer)
        res.send(savedUSer)
    }
    catch(err)
    {
      console.log(err)
    }
 
})
app.post('/login',loginValidation,async(req,res)=>{
   try{
    const user = await loginUser(req,res);
    res.send(user);
   }
   catch(err){
    console.log(err)
   }
})
app.listen(process.env.port,(req,res)=>{
    console.log("app is runnig on http://127.0.0.1:3000/")
})