//LOGIC
const { validationResult } = require("express-validator");
const Course = require("../models/course.model");
const httpStatusText = require("../utils/http.status.text"); 
const asyncMiddleware = require("../middleware/async.middleware");
const AppError =require("../utils/appError")


const getAllCourses =asyncMiddleware( async (req, res) => {
  const query = req.query
const limit = query.limit|| 10;//2
const page =query.page || 1;//3
const skip = (page-1)*limit


  // get all courses from DB using Course Model
  const courses = await Course.find({},{"__v":false}).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { courses } });
})

const getSingleCourses = asyncMiddleware(
  async (req, res,next) => {

      const course = await Course.findById(req.params.courseId, { "__v": false });
      if (!course) {
      const error= AppError.create("not found course",404,httpStatusText.FAIL)
        return next(error);
      }
      
      res.json({ status: httpStatusText.SUCCESS, data: { course } });
    }
)


const addCourse =asyncMiddleware( async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
   const error =AppError.create(err.array(),400,httpStatusText.FAIL)
    return next(error)
  }

  const newCourse = new Course(req.body);
  await newCourse.save();
  
  // Remove __v field from the response
  const courseResponse = newCourse.toObject();
  delete courseResponse.__v;

  res.status(201).json({status: httpStatusText.SUCCESS, data: {course: courseResponse}});
})


const updateCourse =asyncMiddleware(async (req, res) => {
    const course = await Course.updateOne(
      { _id: req.params.courseId },
      { $set: { ...req.body } }
    );
    return res.status(200).json({status :httpStatusText.SUCCESS,data:{course:course}});

})


const deleteCourse =asyncMiddleware( async (req, res) => {
  await Course.deleteOne({ _id: req.params.courseId });
  return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getAllCourses,
  getSingleCourses,
  addCourse,
  updateCourse,
  deleteCourse,
};
