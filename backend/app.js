const express = require('express')
const app = express()
const bodyParser=require('body-parser')
const ErrorMiddleware = require('./middleware/error')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const product= require("./routes/productsRoute")
app.use("/api/v1",product)


// middleware for error
app.use(ErrorMiddleware);

module.exports=app
