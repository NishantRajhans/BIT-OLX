const UserSchema = require("../schema/UserSchema");
const ProductSchema = require("../schema/ProductSchema");
require("dotenv").config();
exports.CreateProduct=async(req,res)=>{
try{
    const {ProductImage,ProductDescription,ProductCategory,ProductPrice}=req.body;
    if(!ProductImage||!ProductCategory||!ProductDescription||!ProductPrice){
        return res.status(200).json({
            success: false,
            message:"All fields are required"
        })
    }
    const User=await UserSchema.findOne({Email:req.User.Email});
    const Product=await ProductSchema.create({
        ProductImage: ProductImage,
        ProductDescription: ProductDescription,
        ProductCategory: ProductCategory,
        ProductPrice: ProductPrice,
        ProductSeller:User,
        ProductCreatedAt:Date.now()
    })
    const UpdateUser=await UserSchema.findByIdAndUpdate({_id:User._id},{
        $push:{
            Products:Product._id
        }
    },{new:true});
    return res.status(200).json({
        success: true,
        message:"product create successfully",
        UpdateUser: UpdateUser,
        Product: Product
    })
}catch(err){
    return res.status(200).json({
        success: false,
        message:"Error in creating product"
    })
}
}
exports.EditProduct=async(req,res)=>{
    try{
        const {ProductImage,ProductDescription,ProductPrice}=req.body;
        const ProductId=req.params.id
        const Product=await ProductSchema.findByIdAndDelete(ProductId,{
            ProductImage:ProductImage,
            ProductDescription:ProductDescription,
            ProductPrice:ProductPrice,
        },{new:true});
        return res.status(200).json({
            success: true,
            message:"Product Edit successfully",
            Product:Product,
        })
}catch(err){
    return res.status(200).json({
        success: false,
        message:"Error in editing product"
    })
}
}
exports.DeleteProduct=async(req,res)=>{
    try{
        const ProductId=req.params.id
        const Product=await ProductSchema.findByIdAndDelete({_id:ProductId});
        const UpdateUser=await UserSchema.findByIdAndUpdate(req.User.id,{
            $pull:{
                Products:Product._id
            }
        },{new:true});
        return res.status(200).json({
            success: true,
            message:"product delete successfully",
            UpdateUser: UpdateUser,
            Product: Product
        })
}catch(err){
    return res.status(200).json({
        success: false,
        message:"Error in deleting product"
    })
}
}
exports.GetAllProducts=async(req,res)=>{
    try{
        const Products=await ProductSchema.find({}).populate("UserSchema").exec();
        
        return res.status(200).json({
            success: true,
            message:"Get all products successfully",
            Products: Products
        })

}catch(err){
    return res.status(200).json({
        success: false,
        message:"Error in get all products"
    })
}
}
exports.GetProduct=async(req,res)=>{
    try{
        const Product=await ProductSchema.find(req.params.id).populate("UserSchema").exec();
        return res.status(200).json({
            success: true,
            message:"Get product successfully",
            Product: Product
        })
}catch(err){
    return res.status(200).json({
        success: false,
        message:"Error in get product"
    })
}
}
exports.GetMyProduct=async(req,res)=>{
    try{
        const User=req.User
        const Product=await ProductSchema.find(User._id).populate("UserSchema").exec();
        return res.status(200).json({
            success: true,
            message:"Get product successfully",
            Product: Product
        })
}catch(err){
    return res.status(200).json({
        success: false,
        message:"Error in get my product"
    })
}
}