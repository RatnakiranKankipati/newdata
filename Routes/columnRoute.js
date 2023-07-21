const column=require("../Controllers/columnController")
const express=require("express")
const router=express.Router()
const authentication=require("../middleware/authentication")


router.route("/createcolumn").post(authentication,column.CreateColumn)
router.route("/getcolumns").get(authentication,column.FindallColumns)
router.route("/editcolumn/:id").patch(authentication,column.UpdateColumn)

module.exports=router
