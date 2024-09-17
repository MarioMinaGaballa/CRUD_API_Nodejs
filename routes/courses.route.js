
const express =require('express')
const { body } = require("express-validator");
const courseController=require("../Controllers/Courses.Controllar")
const router = express.Router()
const verifyToken =require('../middleware/verifyToken');
const UserRoles = require('../utils/Roles');
const allowedTo = require('../middleware/allowedTo');

router.route('/')
   .get(courseController.getAllCourses)
   .post(verifyToken,allowedTo(UserRoles.MANAGER),
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
    .patch(verifyToken,allowedTo(UserRoles.ADMIN,UserRoles.MANAGER),courseController.updateCourse)
    .delete(verifyToken,allowedTo(UserRoles.ADMIN,UserRoles.MANAGER),courseController.deleteCourse)


module.exports =router