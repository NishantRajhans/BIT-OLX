const mongoose = require('mongoose')
const ProductSchema=new mongoose.Schema({
    ProductImage:{
        type:String,
        required:true,
    },
    ProductDescription:{
        type:String,
        required:true,
    },
    ProductCategory:{
        type:String,
        required:true,
    },
    ProductPrice:{
        type:Number,
        required:true,
    },
    ProductSeller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserSchema",
    },
    ProductCreatedAt:{
        type:Date,
        default:Date.now,
    }
})
module.exports =mongoose.model("ProductSchema",ProductSchema);