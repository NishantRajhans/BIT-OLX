const UserSchema = require("../schema/UserSchema");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.EditUser=async(req,res)=>{
try{
const User=req.User;
const {
    FirstName,
    LastName,
    Email,
    Password,
    PhoneNumber,
  } = req.body;
  const hashedPassword=await bcrypt.hash(Password,10);
  const NewUser=await UserSchema.findOneAndUpdate({Email:Email},{
    FirstName:FirstName,
    LastName:LastName,
    Email:Email,
    Password:hashedPassword,
    PhoneNumber:PhoneNumber
  },{new:true})
  console.log("3");
  return res.status(200).json({
    success: true,
    message:"User updated successfully",
    NewUser:NewUser
})
}catch(err){
    return res.status(200).json({
        success: false,
        message:"Error in EditUser"
    })
}
}
exports.ForgetPassword=async(req,res)=>{
    try{

    }catch(err){
    return res.status(200).json({
        success: false,
        message:"Error in ForgetPassword"
    })
}
}
exports.AddToWishList=async(req,res)=>{
    try{
        const ProductId=req.body.ProductId;
        const {UserId}=req.User;
        const User=await UserSchema.findByIdAndUpdate({UserId:UserId},{$push:{
            WishList:ProductId
        }},{new:true})
        return res.status(200).json({
            success: true,
            message:"Product Successfully Added To WishList",
            User:User
        })
    }catch(err){
        return res.status(200).json({
            success: false,
            message:"Error in AddToWishList"
        })
    }
}
exports.RemoveFromWishList=async(req,res)=>{
    try{
        const ProductId=req.body.ProductId;
        const {UserId}=req.User;
        const User=await UserSchema.findByIdAndUpdate({UserId:UserId},{$pull:{
            WishList:ProductId
        }},{new:true})
        return res.status(200).json({
            success: true,
            message:"Product Successfully Added To WishList",
            User:User
        })
    }catch(err){
        return res.status(200).json({
            success: false,
            message:"Error in RemoveFromWishList"
        })
    }
}