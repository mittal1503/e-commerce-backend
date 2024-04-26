const User = require('../models/user');
const bcrypt = require('bcrypt')

const registerUser = async(req,res) =>{
 try{
  const saltRound = 10;
  const hashpassword = await bcrypt.hash(req.body.password,saltRound);
  const newUser = new User({
    name:req.body.name,
    email:req.body.email,
    password:hashpassword
})
  const user = await newUser.save();
   return user;
 }
 catch(err)
 {
  console.log("error in adding",err);
  return;
 }
}

const loginUser = ()=>{

}
module.exports = {registerUser, loginUser};