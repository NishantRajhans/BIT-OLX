const UserSchema = require("../schema/UserSchema");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.EditUser=async(req,res)=>{
try{
const {
    FirstName,
    LastName,
    Email,
    Password,
    ConfirmPassword ,
    PhoneNumber,
  } = req.body;
  if (!Email || !Password || !ConfirmPassword||!PhoneNumber||!FirstName||!LastName) {
    return res.status(200).json({
      success: false,
      message: "All fields are required",
    });
  }
  if (Password !== ConfirmPassword) {
    return res.status(200).json({
      success: false,
      message: "Password and Confirm Password do not match",
    });
  }
  const hashedPassword=await bcrypt.hash(Password,10);
  const NewUser=await UserSchema.findOneAndUpdate({Email:req.User.Email},{
    FirstName:FirstName,
    LastName:LastName,
    Email:Email,
    Password:hashedPassword,
    PhoneNumber:PhoneNumber
  },{new:true})
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
        const check=await UserSchema.findOne({Email:req.User.Email,WishList:ProductId})
        if(check){
            return res.status(200).json({
                success: false,
                message:"Product already present in wish list"
            }) 
        }
        const User=await UserSchema.findOneAndUpdate({Email:req.User.Email},{$push:{
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
        const ProductId=req.params.id;
        const User=await UserSchema.findOneAndUpdate({Email:req.User.Email},{$pull:{
            WishList:ProductId
        }},{new:true})
        return res.status(200).json({
            success: true,
            message:"Product Successfully Remove from WishList",
            User:User
        })
    }catch(err){
        return res.status(200).json({
            success: false,
            message:"Error in RemoveFromWishList"
        })
    }
}
exports.GetAllWishListProducts=async(req,res)=>{
    try{
        const User=await UserSchema.find({Email:req.User.Email}).populate("WishList").exec()
        return res.status(200).json({
            success: true,
            message:"WishList fetch successfully",
            User:User
        })
    }catch(err){
        return res.status(200).json({
            success: false,
            message:"Error in GetAllWishListProducts"
        })
    }
}
