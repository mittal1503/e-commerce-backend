const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const addItemInCart = async(req,res)=>{
    const{userid,itemid,qty} = req.body;
   try{
    const cart = await prisma.cart.findUnique({
        where:{
            userid:userid
        }
    });
    if(cart)
        {
        const cartitem = await prisma.cartItem.findFirst({
            where:{
                cartid:cart.id,
                itemid:itemid
            }
        })
        if(cartitem)
            {  console.log("cartItem found",cartitem)
                const updatedCartItem = await prisma.cartItem.update({
                    where:{
                        id:cartitem.id
                    },
                    data:{
                        qty:qty        
                    }
                })
                res.send({updatedCartItem:updatedCartItem,message:"Cart updated successfully"})
                return;
            }
            else{
                const newcartitem = await prisma.cartItem.create({data:{cartid:cart.id,itemid,qty}});
                res.send({newcartitem:newcartitem,message:"Item added in cart succesfully"})
                return;
            }
          
        }
    else{
        const newcart = await prisma.cart.create({data:{userid}});
        console.log("new cart created",newcart)
        const newcartitem = await prisma.cartItem.create({data:{cartid:newcart.id,itemid,qty}});
        res.send({newcart:newcart,newcartitem:newcartitem,"message":"Cart created and items added successfully"})
    }   
   }
   catch(err)
   {
       console.log("error ",err)
   }
}

const getuseritem = async(req,res)=>{
    const {userid} = req.query;
    try{
         const cart = await prisma.cart.findUnique({
            where:{
                userid:parseInt(userid)
            }
         })
        if(cart)
        {
          const cartItem = await prisma.cartItem.findMany({
            where:{
                cartid:cart.id
            }
          })

          res.send({cartItem:cartItem,message:"Cart item found"})
          return;
        }
        else{
            res.send({message:"Cart not found"})
            return;
        }
    }
    catch(err){
       console.log("err",err)
    }
}

module.exports = {addItemInCart,getuseritem};