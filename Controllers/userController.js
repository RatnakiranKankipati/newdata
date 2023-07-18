const userModel = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const signToken = (id, name, userrole) => {
    return jwt.sign({ id, name, userrole }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TOKEN_EXPIRES_IN
    })
}
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id, user.name, user.userrole)
    user.password = undefined;
    return res.status(statusCode).json({
        status: "success",
        token,
        user
    })
}

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!email || !password || !name) {
            return res.status(401).json({
                status: "fail",
                message: "all the fields are required"
            })
        }
        const alreadyuser = await userModel.findOne({ "email":email})
        if (alreadyuser) {
            return res.status(401).json({
                status: "fail",
                message: "someone have alreday used to the email please enter the new email"
            })
        }
        const user = await userModel.create({
            name: name,
            email: email,
            password: password,
        })
        createSendToken(user, 201, res)
    }
    catch (err) {
        console.log(err);

    }

}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(401).json({
                status: "fail",
                message: "Email & Password Mandatory...!"
            })
        }
        const user = await userModel.findOne({ email })

        // if (!user) {
        //     return res.status(401).json({
        //         status: "fail",
        //         message: "please provide the vaild email and password"
        //     })
        // }
        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "Invaild credentials...!"
            }
            )
        }
        const userpassword = await bcrypt.compare(password, user.password)
        user.password = undefined
        // const userpassword=user.correctPassword(password,user.password)
        if (userpassword) {
            
           return createSendToken(user, 200, res)

        }
        else {
            return res.status(401).json({
                status: "fail",
                message: "Invaild credentials...!"
            })

        }
    }
    catch (err) {
        console.log(err);
    }
}















