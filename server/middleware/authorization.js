const { Food } = require('../models');
function authorization (req, res, next){
    Food.findByPk(req.params.id)
    .then(food=>{
        if(food){
            if(food.UserId == req.UserId){
                next()
            }
            else{
                res.status(400).json({message:'Access Forbidden'})
            }
        }else{
            res.status(404).json({message:'Food Not Found'})
        }
    })
}
module.exports = authorization;