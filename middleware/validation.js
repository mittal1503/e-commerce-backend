const joi = require('joi');

const registerValidation = (req,res,next) =>{
    const schema = joi.object({
        name: joi.string().alphanum().min(3).required(),
        email:joi.string().pattern(/^\S+@\S+$/).required(),
        password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    })
    const {value,error} = schema.validate({email:req.body.email, name:req.body.name, password:req.body.password})
    if(error)
    {
        res.send(error)
    }
    else{
        next();
    }
}
const loginValidation =(req,res,next)=>{
    const schema = joi.object({
        email:joi.string().pattern(/^\S+@\S+$/).required(),
        password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })
    const {value,error} = schema.validate({email:req.body.email,password:req.body.password})
    if(error) res.send(error)
    else next();
    
}
module.exports = {registerValidation,loginValidation};