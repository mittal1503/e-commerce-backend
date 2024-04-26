const mongoose = require('mongoose');

 const dbConnection = async() =>{
    try{
         await mongoose.connect(process.env.connection_string
        )
        console.log("Connection established successfully")
            }
        catch(err){
            console.log("error in connection",err)
        }
}
module.exports = dbConnection