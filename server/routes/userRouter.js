const {Router}= require('express');
const Controller = require('../controllers/userController')
userRouter = Router();
userRouter.post('/register', Controller.register);
userRouter.post('/login', Controller.login);
module.exports = userRouter;