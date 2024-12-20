const express=require('express')
const userController=require('../controllers/userController')
const projectController=require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')


const router=new express.Router()

// register - POST
router.post('/register',userController.registerController)

//login-post
router.post('/login',userController.loginController)

//addProject - POST
router.post('/add-project',jwtMiddleware,multerMiddleware.single('projectImage'),projectController.addProjectController)

//home project-get
router.get('/home-project',projectController.getHomeProjectController)

//user-Project - get
router.get('/user-project',jwtMiddleware,projectController.getUserProjectController)

//all-Project - get
router.get('/all-project',jwtMiddleware,projectController.getAllProjectController)

//Edit project-put
router.put('/project/:id/edit',jwtMiddleware,multerMiddleware.single("projectImage"),projectController.editProjectController)

//remove projcts
router.delete('/project/:id/remove',jwtMiddleware,projectController.removeProjectController)

//edit user-put
router.put('/user/edit',jwtMiddleware,multerMiddleware.single("profilePic"),userController.editUserController)



module.exports=router

