const {Router}= require('express');
const Controller = require('../controllers/foodController')
const authorization = require('../middleware/authorization')
const authentication = require('../middleware/authentication')


foodRouter = Router();
foodRouter.use(authentication)
foodRouter.post('/', Controller.addFood);
foodRouter.get('/', Controller.showFoods);
foodRouter.delete('/:id', authorization, Controller.deleteFood);

module.exports = foodRouter;