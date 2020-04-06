const {  Food } = require('../models');
const jwt = require('jsonwebtoken');

class UserController {
    static addFood (req, res){
        let input = req.body;
        Food.create({
            title: input.title,
            price: input.price,
            ingridients: input.ingredients,
            tag: input.tag,
            UserId: req.UserId

        }).then(food=>{
            res.status(201).json({food})
        }).catch(err=>{
            if(err.name == 'SequelizeValidationError'){
                res.status(400).json({message:err.message});
            }else{
                res.status(500).json({message:err.message});
            }
        })
    }
    static showFoods(req, res){
        Food.findAll({where: {UserId: req.UserId}})
        .then(foods=>{
            res.status(200).json({foods});
        }).catch(err=>{
            res.status(500).json({message:err.message});
        })
    }
    static deleteFood(req,res){
        let id = req.params.id;
        Food.findByPk(id)
        .then(food=>{
            if(food){
                return Food.destroy({where: {id:id}});
            }else{
                res.status(404).json({message: 'Food not found'})
            }
        }).then(()=>{
            res.status(200).json({message: "Successfully delete food from your menu"});
        }).catch(err=>{
            res.status(500).json({message:err.message});
        })
    }
}
module.exports = UserController;