const express = require('express')
const app = express();
const cors = require('cors')
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();
app.use(cors(
  {
    origin:'*',
    methods:'GET,POST,PUT,DELETE',
    credentials:true
  }
));
const session = require('express-session')
const passport = require('passport')
const OAuth2Strategy = require('passport-google-oauth20').Strategy;

const {registerUser,loginUser} = require('./routing/user')
const {registerValidation,loginValidation} = require('./middleware/validation')
const {addItemInCart,getuseritem} = require('./routing/carts')
const {addItem,getItems} = require('./routing/item');
const { Prisma } = require('@prisma/client');

app.use(express.json())
require('dotenv').config();

app.use(session({
  secret:process.env.secret,
  resave:false,
  saveUninitialized:false,
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new OAuth2Strategy(
  {
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:'http://127.0.0.1:3000/auth/google/callback',
    scope:["profile","email"]
  },
  async(accesstoken,refreshtoken,profile,done)=>{
    console.log("profile",profile)
    try{
      const user = await prisma.user.findUnique({
        where:{
          email:profile.emails[0].value
        }
      })
      console.log("user",user)
      if(!user)
      {
        const user = await prisma.user.create({
          data:{
            name:profile.displayName,
            email:profile.emails[0].value,
            googleId:profile.id,
            password:""
          }
        })
        return done(null,user)
      }
      else
       return done(null,user)
    }
    catch(err){
      console.log(err)
      return done(err,null)
    }
  }
))

passport.serializeUser((user,done)=>{
  done(null,user);
})

passport.deserializeUser((user,done)=>{
  done(null,user)
})

//intialize google 
app.get('/auth/google',passport.authenticate("google",{scope:["profile","email"]}))
app.get('/auth/google/callback',passport.authenticate("google",
{
  successRedirect:'http://localhost:3001',
  failureRedirect:'http://localhost:3001/login'
}
))
app.get('/login/success',(req,res)=>{
  console.log("log user", req.user)
  try{
    if(req.user)
    {
      res.send({message:"fetch user ",user:req.user})
    }
    else
    {
      res.send({message:"not found user"})
    }
  }
  catch(err){
    console.log("error",err)
    res.send(err)
    return;
  }

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

app.post('/additem',(req,res)=>{
  addItem(req,res)
})

app.get('/getitem',async(req,res)=>{
  getItems(req,res);
})

app.post('/addcart',async(req,res)=>{
  addItemInCart(req,res)
})

app.get('/getcartitems',async(req,res)=>{
  getuseritem(req,res)
})
app.listen(process.env.port,(req,res)=>{
    console.log("app is runnig on http://127.0.0.1:3000/")
})