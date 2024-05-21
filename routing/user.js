const bcrypt = require('bcrypt')
const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();
const registerUser = async (req, res) => {

  try {
    const saltRound = 10;
    const hashpassword = await bcrypt.hash(req.body.password, saltRound);
    const user1 = {
      name: req.body.name,
      email: req.body.email,
      password: hashpassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const user = await prisma.user.create({data:user1});
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
    const user = await prisma.user.findUnique({
      where:{
        email:req.body.email
      }
    })
    console.log("user",user)
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
    console.log("error",err)
    res.send(err)
  }

}
module.exports = { registerUser, loginUser };