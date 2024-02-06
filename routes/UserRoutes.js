const express = require('express')
const router=express.Router()
const {AuthMiddleware}=require("../middleware/AuthMiddleware")
const {EditUser,ForgetPassword,AddToWishList,RemoveFromWishList}=require("../controllers/UserController")
router.put("/EditUser",AuthMiddleware,EditUser)
router.put("/ForgetPassword",AuthMiddleware,ForgetPassword)
router.put("/AddToWishList",AuthMiddleware,AddToWishList)
router.put("/RemoveFromWishList",AuthMiddleware,RemoveFromWishList)
module.exports = router