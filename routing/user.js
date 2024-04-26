const User = require('../models/user');
const bcrypt = require('bcrypt')

const registerUser = async (req, res) => {
  try {
    const saltRound = 10;
    const hashpassword = await bcrypt.hash(req.body.password, saltRound);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashpassword
    })
    const user = await newUser.save();
    return user;
  }
  catch (err) {
    console.log("error in adding", err);
    res.send(err)
    return;
  }
}

const loginUser = async(req,res) => {
  try{
    const user = await User.findOne({email:req.body.email})
    if(!user)
    {
      return res.send("user not found")
    }
    ismatch = await bcrypt.compare(req.body.password,user.password)
    if(!ismatch)
    {
      return res.send("password is invalid")
    }
    return user;
  }
  catch(err){
    res.send(err)
  }

}
module.exports = { registerUser, loginUser };