const express = require("express");
const app = express();


const mongoose =require("mongoose")
const url =
  "mongodb+srv://mariomena199:nodejs@learn-mongodb.yfjlw.mongodb.net/App?retryWrites=true&w=majority&appName=Learn-mongoDb";
mongoose.connect(url).then(()=>{
  console.log("Connected Successfully To DataBase");
})


const port = 4000;
const courseRouter=require('./routes/courses.route')
app.use(express.json());
app.use('/api/courses',courseRouter)


app.listen(port, () => {
  console.log("listening in port 4000");
});
