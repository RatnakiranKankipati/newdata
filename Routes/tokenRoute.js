const token=require("../Controllers/tokenController")
const express=require("express")
const router=express.Router()
const authentication=require("../middleware/authentication")


router.route("/createtoken").post(authentication,token.createToken)
router.route("/gettoken").get(authentication,token.Findtoken)
router.route("/edittoken/:id").patch(authentication,token.updateToken)

module.exports=router
