const express = require('express')
const app = express()
const product= require("./routes/productsRoute")

app.use("/api/v1",product)

module.exports=app