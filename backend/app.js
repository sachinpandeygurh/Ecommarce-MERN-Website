const express = require('express')
const app = express()
const bodyParser=require('body-parser')
const ErrorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// middleware for error
app.use(ErrorMiddleware);

app.use(express.json())

// middleware for cookies
app.use(cookieParser())

const product= require("./routes/productsRoute")
const user= require("./routes/userRoute")

app.use("/api/v1",product)
app.use('/api/v1', user)


module.exports=app


