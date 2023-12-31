const mongoose=require("mongoose")
const bcrypt=require("bcrypt")


const userSchema=new mongoose.Schema({
        firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
        
    },
    password:{
        type:String,
        required:true
    },
     passwordConfirm:{
        type:String,
        require:true
    },
    passwordCurrent:String,


},
{timestamps:true} 
)


userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


const userModel=new mongoose.model("users",userSchema)

module.exports=userModel
