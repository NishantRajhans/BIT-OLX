const express = require('express');
const router=express.Router();
const {LogIn,SignUp,VerifyUser}=require("../controllers/AuthControllers");
router.post('/LogIn',LogIn);
router.post('/SignUp',SignUp);
router.get('/VerifyUser/:id',VerifyUser);
module.exports = router;