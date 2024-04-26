const joi = require('joi');

const registerValidation = (req,res,next) =>{
    const schema = joi.object({
        name: joi.string().alphanum().min(3).required(),
        email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
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
module.exports = {registerValidation};