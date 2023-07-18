const userController=require("../Controllers/userController")
const express=require("express")
const router=express.Router()

router.route("/user/signup").post(userController.signup)
router.route("/user/login").post(userController.login)

module.exports=router


