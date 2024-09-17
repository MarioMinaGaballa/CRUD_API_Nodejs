const jwt =require('jsonwebtoken')
const httpStatusText =require('../utils/http.status.text')
const appError =require('../utils/appError')
const verifyToken=(req,res,next)=>{
  const authHeader=req.headers['Authorization'] || req.headers['authorization']

   if(!authHeader){
    const error=appError.create("token is required",401,httpStatusText.ERROR)
    return next(error) 
   }


  const token = authHeader.split(' ')[1];
  try{
   const decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY)

   next();
  }catch(err){
    const error=appError.create("invalid token",401,httpStatusText.ERROR)
    return next(error)  
  
  }
  

  
}
module.exports= verifyToken;