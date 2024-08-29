//LOGIC
let {courses} =require('../data/courses')
const {validationResult } = require("express-validator");

const getAllCourses= (req, res) => {
  res.json(courses);
}

const getSingleCourses= (req, res) => {
  const courseID = +req.params.courseId;
  const course = courses.find((courses) => courses.id == courseID);
  if (!course) {
    return res.status(404).json({ msg: "course not found" });
  }
  res.json(course);
}



const addCourse=(req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json(err.array());
  }

const course={id:courses.length + 1,...req.body};
courses.push(course)
  res.status(201).json(course);
}


const updateCourse=(req,res)=>{
  const id  = +req.params.couresId
  let  course = courses.find((courses) => courses.id == id);
  if (!course) {
    return res.status(404).json({ msg: "course not found" });
  }
  course={...course,...req.body}
  res.status(200).json(course)


}


const deleteCourse=(req,res)=>{
  const id  = +req.params.couresId
  courses=courses.filter((course)=>{course.id!==id})
  res.status(200).json({success:true})
}


module.exports={
  getAllCourses,
  getSingleCourses,
  addCourse,
  updateCourse,
  deleteCourse
}


