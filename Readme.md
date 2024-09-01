
<!--create Server -->
const express = require("express");
const app = express();
const port = 4000;
app.listen(port, () => {
  console.log("listening in port 4000");
});



<!--Connected To Database-->
const url =
  "mongodb+srv://mariomena199:<Password>@learn-mongodb.yfjlw.mongodb.net/App?retryWrites=true&w=majority&appName=Learn-mongoDb";
mongoose.connect(url).then(()=>{
  console.log("Connected Successfully To DataBase");
})


<!--Create Schema With Mongoose -->
const mongoose =require("mongoose")
const courseSchema=new mongoose.Schema({
title:{
  type :String,
  required:true
},
price:{
  type :Number,
  required:true
}
})
