
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user.model");
const { client } = require("../configs/redis");
const { generateOtpAndSendEmail } = require("../nodemailer");
const { passport } = require("../middleware/google_oAuth")
const otpGenerator = require("otp-generator")
const userRouter = express.Router();
require("dotenv").config();



//singup endpoint
userRouter.post("/register", async (req, res) => {
    try {

        const { name, email, password, role } = req.body
        const clientSideOtp = req.query.otp
        const otp = await client.get("otp")
     //   console.log(otp, clientSideOtp)
      //  console.log(typeof (otp), typeof (clientSideOtp))


        // check if user is already register 
        const user = await userModel.findOne({ email })
        if (user) return res.send({ "msg": 'user is already register' });


        if (clientSideOtp === undefined) {

            //generate 4 digit otp
            const otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })

            await client.setEx("otp", 60 * 30, otp)
            generateOtpAndSendEmail(email, otp)

        }


        //check client side otp and server side otp
        else if (clientSideOtp === otp) {

            //hash password and save to mongodb
            const hashPassword = await bcrypt.hash(password, +process.env.saltRound)
            await new userModel({ name, email, password: hashPassword, role }).save()
            return res.send({ "msg": "SignUp successful" })

        } else {
            return res.send({ "msg": "wrong otp" })
        }

        res.send({ "msg": "waiting for otp verification" })
    } catch (error) {
        res.send({ "error": error.message })
    }
})




//login endpoint
userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        console.log(email, password)

        if (user) {
            const matchPassword = bcrypt.compare(password, user.password)
            if (matchPassword) {
                const token = jwt.sign({ userId: user._id , role:user.role }, process.env.jwtSecretKey, { expiresIn: "7d" })
                const refreshToken = jwt.sign({ userId: user._id , role:user.role }, process.env.jwtRefreshSecretKey, { expiresIn: "28d" })
                res.cookie("token", token)
                res.cookie("refreshToken", refreshToken)
                res.send({ "msg": "login successful","name": user.name})
            } else {
                res.send({ "msg": "wrong password" })
            }
        } else {
            res.send({ "msg": "wrong credential" })
        }
    } catch (error) {
        res.send({ "error": error.message })
    }
})




//logout endpoint
userRouter.get("/logout", async (req, res) => {
    try {
        const { token } = req.cookies
        await client.set("blacklist", token)
        res.send({ "msg": "Logout successful" })
    } catch (error) {
        res.send({ "error": error.message })
    }
})




//refreshToken endpoint
userRouter.get("/refreshToken", async (req, res) => {
    try {
        const refreshToken = req.cookies("refreshToken")
        const decoded = jwt.verify(refreshToken, process.env.jwtRefreshSecretKey)

        if (decoded) {
            const token = jwt.sign({ userId: user._id }, process.env.jwtSecretKey, { expiresIn: "1h" })
            res.cookie("token", token)
            res.send({ "msg": "Token is refresh, please login again" })
        }
    } catch (error) {
        res.send({ "error": error.message })
    }
})
module.exports = { userRouter }