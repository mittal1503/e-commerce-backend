const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();

const addItem = async(req,res)=> {
  try{
    const newitem = await prisma.item.create({data:req.body})
    console.log("new item created",newitem)
    res.send(newitem)
  }
  catch(err){
    console.log("er",err)
    res.send(err)
  }
}

const getItems = async(req,res)=>{
    try{
       const items = await prisma.Item.findMany();
       console.log("items",items);
       res.send(items)
    }
    catch(err)
    {
        res.send(err)
    }
}
module.exports = {addItem,getItems}
