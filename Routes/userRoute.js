const userController=require("../Controllers/userController")
const authentication=require("../middleware/authentication")
const express=require("express")
const router=express.Router()

router.route("/user/signup").post(userController.signup)
router.route("/user/login").post(userController.login)
router.route("/user/updatepassword").patch(authentication,userController.updatePassword)

module.exports=router


