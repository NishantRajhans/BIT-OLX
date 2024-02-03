const express = require("express");
const UserSchema = require("../schema/UserSchema");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer=require("nodemailer");
require("dotenv").config();
const Sendmail=async(FirstName,Email,UserId)=>{
  try{
    const transporter= nodemailer.createTransport({
      host:process.env.MAIL_HOST,
      auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
      }
    })
    const hashId=JWT.sign({
      UserId
    },process.env.JWT_SECRET_KEY);
    let info=await transporter.sendMail({
      from:'Nishant Priyadarshi',
      to:Email,
      subject:"For Varification of Email",
      html:`<p>Hii ${FirstName}, Please Click Here <a href="https://bitolx-backend.onrender.com/api/v1/Auth/VerifyUser/${hashId}">Link</a> To Verify Your Email</p>`
    })
  }catch(err){
    console.log("Error while sending Email",err)
  }
}
exports.LogIn = async (req, res) => {
    try{
        const {Email,Password,ConfirmPassword}=req.body;
        if(!Email ||!Password || !ConfirmPassword){
            return res.status(200).json({
                success: false,
                message: "All fields are required",
              });
        }
        if(Password!==ConfirmPassword){
            return res.status(200).json({
                success: false,
                message: "Password and Confirm Password do not match",
              });
        }
        const User=await UserSchema.findOne({Email:Email})
        if(!User){
            return res.status(200).json({
                success: false,
                message: "User does not exist",
              });
        }
        if(!User.Verified){
          return res.status(200).json({
            success: false,
            message: "User does not verified",
          });
        }
        if(! await bcrypt.compare(Password, User.Password)){
            return res.status(200).json({
                success: false,
                message: "Password is incorrect",
              });
        }
        const Token= await JWT.sign({
            Email:Email,
            Password:Password,
        },process.env.JWT_SECRET_KEY)
        User.Token=Token
        User.Password=undefined
        return res.status(200).json({
            success: true,
            message: "User LogIn successfully",
            User:User
          });
    }catch(err){
        console.log(err);
    return res.status(200).json({ success: false, message: "Error In LogIn" });
    }
};
exports.SignUp = async (req, res) => {
  try {
    const {
      FirstName,
      LastName,
      Email,
      Password,
      ConfirmPassword,
      PhoneNumber,
    } = req.body;
    if (
      !FirstName ||
      !LastName ||
      !Email ||
      !PhoneNumber ||
      !ConfirmPassword ||
      !Password
    ) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (Password !== ConfirmPassword) {
      return res.status(200).json({
        success: false,
        message: "Password And Confirm Password Does Not match",
      });
    }
    const User = await UserSchema.findOne({ Email: Email });
    if (User) {
      return res.status(200).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(Password,10);
    const NewUser = await UserSchema.create({
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      PhoneNumber: PhoneNumber,
      Password: hashedPassword,
      Verified: false,
    });
    Sendmail(FirstName,Email,NewUser._id);
    return res
      .status(200)
      .json({ success: true, message: "Email send Successfully" ,NewUser:NewUser});
  } catch (err) {
    console.log(err);
    return res.status(200).json({ success: false, message: "Error In SignUp" });
  }
};
exports.VerifyUser=async(req,res)=>{
    try{
      const HashedId=req.params.id;
      const UserId= JWT.verify(HashedId,process.env.JWT_SECRET_KEY)
      const UpdateUser=await UserSchema.findByIdAndUpdate(UserId.UserId,{
        $set:{
          Verified:true
        }
      },{new:true})
        return res.status(200).json({
            success:true,
            message:"User verified successfully",
            UpdateUser:UpdateUser
        })

    }catch(err){
        console.log(err);
    return res.status(200).json({ success: false, message: "Error In VerifyUser" });
    }
}
