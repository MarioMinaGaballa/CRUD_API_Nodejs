
const express =require('express')
const { body } = require("express-validator");
const courseController=require("../Controllers/Courses.Controllar")
const router = express.Router()



router.route('/')
   .get(courseController.getAllCourses)
   .post(
      //Validtion >> title
      [
      body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 2 })
        .withMessage("At least 2 digits"),
      //validtion >> price
      body("price")
         .notEmpty()
         .withMessage("Price is required")
      ]
      ,courseController.addCourse  
    );


router.route("/:courseId")
    .get(courseController.getSingleCourses)
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse)


module.exports =router