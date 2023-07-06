const ErrorHander = require('../utils/errorhander')

module.exports = (err ,req , res , next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"

// Wrong mongodb Id error
if(err.name=== "CastError"){
    const message= `Resource not found due to invalid: ${err.path}`
    err = new ErrorHander(message ,400)
}


    res.status(err.statusCode).json({
        success: false,
        error :err.message
    })
}