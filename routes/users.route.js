const express =require('express')
const { body } = require("express-validator");
const router = express.Router()
const userController = require('../Controllers/Users.Controllar')
const verifyToken =require('../middleware/verifyToken')
//get all users
//register
//login

router.route('/')
   .get(verifyToken,userController.getAllUsers)

router.route('/register')
   .post(userController.register)


router.route('/login')
   .post(userController.Login)







module.exports =router;