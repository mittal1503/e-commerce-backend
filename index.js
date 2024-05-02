const express = require('express')
const app = express();
const cors = require('cors')
app.use(cors());

const {registerUser,loginUser} = require('./routing/user')
const {registerValidation,loginValidation} = require('./middleware/validation')
const {addItem,getItems} = require('./routing/item')

app.use(express.json())
require('dotenv').config();


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

app.post('/additem',(req,res)=>{
  addItem(req,res)
})

app.get('/getitem',async(req,res)=>{
  getItems(req,res);
})
app.listen(process.env.port,(req,res)=>{
    console.log("app is runnig on http://127.0.0.1:3000/")
})