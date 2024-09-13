require("dotenv").config()
const express = require("express");
const cors=require("cors")
const app = express();
const httpStatusText=require('./utils/http.status.text')

const mongoose =require("mongoose")
const url =process.env.MONGO_URL
const port = process.env.PORT
  
mongoose.connect(url).then(()=>{
  console.log("Connected Successfully To DataBase");
})

const courseRouter=require('./routes/courses.route')

app.use(cors())
app.use(express.json());
app.use('/api/courses',courseRouter)


//global middleware for not found router
app.use("*",(req,res,next)=>{
  return res.status(404).json({status:httpStatusText.ERROR,message:"this resourse not avaliable"})
})
//global error handler 
app.use((error,req,res,next)=>{
  res.status(error.statusCode || 500).json({status:httpStatusText.ERROR|| httpStatusText.ERROR,message:error.message,code:error.statusCode || 500,data:null })
})

app.listen(port, () => {
  console.log(`listening in port ${port}`);
});
