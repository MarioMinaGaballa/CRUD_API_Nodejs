const appError = require("../utils/appError")


module.exports =(...roles)=>{

  return (req,res,next)=>{
     if(!roles.includes(req.currentUser.role)){
       const error=appError.create(`you are not allowed to access this route beacuse you is ${req.currentUser.role}`,403)
       return next(error)
     }
  }
}