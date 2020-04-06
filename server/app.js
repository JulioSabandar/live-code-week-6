require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const router = require('./routes/index');
const port = 5000;
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(router);
app.listen(port, ()=>{
    console.log('Listening on port ', port);
})