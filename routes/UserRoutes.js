const express = require('express')
const router=express.Router()
const {AuthMiddleware}=require("../middleware/AuthMiddleware")
const {EditUser,ForgetPassword}=require("../controllers/UserController")
router.put("/EditUser",AuthMiddleware,EditUser)
router.put("/ForgetPassword",AuthMiddleware,ForgetPassword)
module.exports = router