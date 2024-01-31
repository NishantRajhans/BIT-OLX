const express = require('express');
const router=express.Router();
const {LogIn,SignUp,VerifyUser}=require("../controllers/AuthControllers");
router.post('/login',LogIn);
router.post('/signup',SignUp);
router.post('/verifyuser/:id',VerifyUser);
module.exports = router;