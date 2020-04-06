const {  User } = require('../models');
const checkPassword = require('../helpers/checkPassword');
const hashPassword = require('../helpers/hashPassword');
const jwt = require('jsonwebtoken');

class UserController {
    static register (req, res){
        User.create({
            email : req.body.email,
            password : hashPassword(req.body.password)
        })
        .then( user =>{
            res.status(201).json({user})
        }).catch(err=>{
            if(err.name == 'SequelizeValidationError'){
                res.status(400).json({message:err.message});
            }else{
                res.status(500).json({message:err.message});
            }
        })
    }
    static login(req, res){
        User.findOne({where:{email:req.body.email}})
            .then(user=>{
                if(!user){
                    res.status(400).json({message:'Invalid Username/Password'})
                }else{
                    if(checkPassword(req.body.password, user.password)){
                        const access_token = jwt.sign({
                            userId : user.id,
                            email: user.email
                        }, process.env.JWT_SECRETKEY);
                        res.status(201).json({access_token})
                    }else{
                        res.status(400).json({message: 'Invalid Username/Password'})
                    }
                }
            })
            .catch(err=>{
                if(err.name == 'SequelizeValidationError'){
                    res.status(400).json({message:err.message});
                }else{
                    res.status(500).json({message:err.message});
                }
            })
    }
}
module.exports = UserController;