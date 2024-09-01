//LOGIC
const { validationResult } = require("express-validator");
const Course = require("../models/course.model");

const getAllCourses = async (req, res) => {
  // get all courses from DB using Course Model
  const courses = await Course.find();
  res.json(courses);
};

const getSingleCourses = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ msg: "course not found" });
    }
    res.json(course);
  } catch (err) {
    return res.status(400).json({ msg: "Invalid Object ID" });
  }
};

const addCourse = async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json(err.array());
  }

  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json(newCourse);
};

const updateCourse = async (req, res) => {

    const course = await Course.updateOne(
      {id:req.params.couresId},
      { $set: {...req.body}});
    return res.status(200).json(course);

}
 
const deleteCourse =async (req, res) => {
  const result = await Course.deleteOne({id:req.params.couresId})
    return  res.status(200).json({ success: true,msg:result });
};

module.exports = {
  getAllCourses,
  getSingleCourses,
  addCourse,
  updateCourse,
  deleteCourse,
};
