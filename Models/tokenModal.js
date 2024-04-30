const mongoose=require("mongoose")

const tokenSchema=new mongoose.Schema({
        accesstoken:{
        type:String,
        required:true
    },
    refreshtoken:{
      type:String,
        required:true
    }
},
{timestamps:true} 
)





const tokenModel=new mongoose.model("tokens",tokenSchema)

module.exports=tokenModel
