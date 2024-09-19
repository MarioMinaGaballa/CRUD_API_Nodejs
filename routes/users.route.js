const express =require('express')
const { body } = require("express-validator");
const router = express.Router()
const appError = require("../utils/appError")

const multer =require('multer')




const diskStorage =multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads')
  },
  filename:(req,file,cb)=>{
    const ext = file.mimetype.split('/')[1]

    cb(null,`user-${Date.now()}.${ext}`)
  }
})

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split('/')[0];
  
  if(imageType === 'image') {
      return cb(null, true)
  } else {
      return cb(appError.create('file must be an image', 400), false)
  }
}


const upload =multer({storage:diskStorage,fileFilter})

const userController = require('../Controllers/Users.Controllar')
const verifyToken =require('../middleware/verifyToken')
//get all users
//register
//login

router.route('/')
   .get(verifyToken,userController.getAllUsers)

router.route('/register')
   .post(upload.single('avatar'),userController.register,)


router.route('/login')
   .post(userController.Login)







module.exports =router;