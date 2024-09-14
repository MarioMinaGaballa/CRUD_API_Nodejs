const asyncMiddleware = require("../middleware/async.middleware");
const httpStatusText = require("../utils/http.status.text"); 
const User =require("../models/user.model");
const appError =require("../utils/appError");

const getAllUsers =asyncMiddleware( async (req, res) => {
  const query = req.query
const limit = query.limit|| 10;//2
const page =query.page || 1;//3
const skip = (page-1)*limit


  // get all courses from DB using Course Model
  const  users = await  User.find({},{"__v":false}).limit(limit).skip(skip);
  res.json({ status: httpStatusText.s, data: { users } });
})



const register =asyncMiddleware(async (req, res,next) => {
  const { firstName, lastName, email, password } = req.body;
  const olduser= await User.findOne({email})
  if(olduser){
   const error=appError.create("user already exist",400,httpStatusText.FAIL)
   next(error)  
  }
  const newuser = await User({
    firstName,
    lastName,
    email,
    password,
  });
  await  newuser.save();
   return res.status(201).json({ status: httpStatusText.SUCCESS, data: { newuser } });
});
     



const Login =asyncMiddleware(async (req, res,next) => {
  
})


module.exports={
  getAllUsers,
  register,
  Login
}