const mongoose=require("mongoose")
const bcrypt=require("bcrypt")


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
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
    // role:{
    //     type:String
    // },
    // passwordConfirm:{
    //     type:String,
    //     require:true
    // },
    // passwordCurrent:String,
    // passwordChanged:Date,
    // passwordResetToken:String,
    // passwordResetExpiress:Date,

    // active:{
    //     type:Boolean,
    //     default:true,
    //     select:false
    // }

},
{timestamps:true} 
)


userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


const userModel=new mongoose.model("users",userSchema)

module.exports=userModel