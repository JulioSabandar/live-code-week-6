const {Router}= require('express');
const userRouter = require('./userRouter');
// const foodRouter = require('./foodRouter');
indexRouter = Router();
indexRouter.use('/', userRouter);
// indexRouter.use('/food', foodRouter);
module.exports = indexRouter;