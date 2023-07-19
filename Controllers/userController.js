const userModel = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const signToken = (id, name, userrole) => {
    return jwt.sign({ id, name, userrole }, "ratnakiran123", {
        expiresIn: "30d"
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
         const alreadyuser = await userModel.findOne({ email })
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
exports.updatePassword = async (req, res, next) => {
    const { password, passwordConfirm, passwordCurrent } = req.body
     if (!password || !passwordConfirm|| !passwordCurrent) {
        return res.status(401).json({
            status: "fail",
            message: "All the fields required"
        })
    }
    const user = await userModel.findOne({ _id: req.user.userId })
    if (!user) {
        return res.status.json({
            status: "fail",
            message: "something wrong"
        })
    }
    const userpassword = await bcrypt.compare(passwordCurrent, user.password)

    if (!userpassword) {
        return res.status(400).json({
            status: "fail",
            message: "Current password is not correct"
        })
    }
    if (password != passwordConfirm) {
        return res.status(400).json({
            status: "fail",
            message: "Newpassword & Confirm password not match"
        })

    }
    user.password = req.body.password
    user.passwordConfirm = undefined
    await user.save()
    return createSendToken(user, 200, res)
}















