//LOGIC
const { validationResult } = require("express-validator");
const Course = require("../models/course.model");
const httpStatusText = require("../utils/http.status.text"); 



const getAllCourses = async (req, res) => {
  // get all courses from DB using Course Model
  const courses = await Course.find();
  res.json({ status: httpStatusText.SUCCESS, data: { courses } });
};

const getSingleCourses = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res
        .status(404)
        .json({
          status: httpStatusText.FAIL,
          data: { course: "Course Not Found" },
        });
    }
    res.json({ status: httpStatusText.SUCCESS, data: { course } });
  } catch (err) {
    return res
      .status(400)
      .json({
        status: httpStatusText.ERROR,
        data: null,
        message: err.message,
        code: 400,
      });
  }
};

const addCourse = async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({status :httpStatusText.FAIL,data:err.array()});
  }

  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json({status :httpStatusText.SUCCESS,data:{course:newCourse}});
};

const updateCourse = async (req, res) => {
  try{
    const course = await Course.updateOne(
      { _id: req.params.courseId },
      { $set: { ...req.body } }
    );
    return res.status(200).json({status :httpStatusText.SUCCESS,data:{course:course}});
  }catch(err){
     return res.status(400).json({status:httpStatusText.ERROR,message:err.message})
  }

};

const deleteCourse = async (req, res) => {
  await Course.deleteOne({ _id: req.params.courseId });
  return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
};

module.exports = {
  getAllCourses,
  getSingleCourses,
  addCourse,
  updateCourse,
  deleteCourse,
};
