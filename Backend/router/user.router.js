
const express =require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user.model");
const { client } = require("../configs/redis");
const userRouter=  express.Router();
require("dotenv").config();


//login endpoint
userRouter.post("/register",async(req,res)=>{
    try {
        const {email,password,role} = req.body
        const hashPassword =  await bcrypt.hash(password,+process.env.saltRound)
        await new userModel({email,password:hashPassword,role}).save()
        res.send({"msg":"SignUp successful"})
    } catch (error) {
        res.send({"error":error.message})
    }
})


//singup endpoint
userRouter.post("/login",async (req,res)=>{
    try {
        const {email,password}= req.body
        const user= await userModel.findOne({email})

        if(user){
           const matchPassword = bcrypt.compare(password,user.password)
           if(matchPassword){
                 const token = jwt.sign({userId:user._id},process.env.jwtSecretKey,{expiresIn:"1h"})
                 const refreshToken = jwt.sign({userId:user._id},process.env.jwtRefreshSecretKey,{expiresIn:"1d"})
                 res.cookie("token",token)
                 res.cookie("refreshToken",refreshToken)
                 res.send({"msg":"login successful"})
           }else{
              res.send({"msg":"wrong password"})
           }
        }else{
            res.send({"msg":"wrong credential"})
        }
    } catch (error) {
        res.send({"error":error.message})
    }
})


//logout endpoint
userRouter.get("/logout",async(req,res)=>{
    try {
         const {token} = req.cookies
         await client.set("blacklist",token)
         res.send({"msg":"Logout successful"})
    } catch (error) {
        res.send({"error":error.message})
    }
})

//refreshToken endpoint
userRouter.get("/refreshToken",async (req,res)=>{
    try {
        const refreshToken = req.cookies("refreshToken")
        const decoded=jwt.verify(refreshToken,process.env.jwtRefreshSecretKey)

        if(decoded){
            const token = jwt.sign({userId:user._id},process.env.jwtSecretKey,{expiresIn:"1h"})
            res.cookie("token",token)
            res.send({"msg":"Token is refresh, please login again"})
        }
    } catch (error) {
        res.send({"error":error.message})
    }
})

module.exports= {userRouter}