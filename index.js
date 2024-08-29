const express = require("express");
const app = express();
const port = 4000;
const courseRouter=require('./routes/courses.route')
app.use(express.json());
app.use('/api/courses',courseRouter)


app.listen(port, () => {
  console.log("listening in port 4000");
});
