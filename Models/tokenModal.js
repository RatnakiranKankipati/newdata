const mongoose=require("mongoose")

const tokenSchema=new mongoose.Schema({
        accesstoken:{
        type:String,
        required:true
    },
    refreshtoken:{
      type:String,
        required:true
    },
        expiretime: {
        type: Date,
        default: () => new Date(Date.now() + 55 * 60 * 1000) // Set default expiration time to current time + 60 minutes
    }
},
{timestamps:true} 
)





const tokenModel=new mongoose.model("tokens",tokenSchema)

module.exports=tokenModel
