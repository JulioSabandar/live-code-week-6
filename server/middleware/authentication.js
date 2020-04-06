const jwt = require('jsonwebtoken');

function authentication(req, res, next){
    const access_token = req.headers.access_token;
    try{
        if(access_token){
            const decode = jwt.verify(access_token, process.env.JWT_SECRETKEY);
            req.UserId = decode.userId;
            req.email = decode.email;
            next()
        }else{
            res.status(404).json({message: 'token not found'})
        }
    }catch(err){
        res.status(400).json({message: err.message})
    }
}
module.exports = authentication;