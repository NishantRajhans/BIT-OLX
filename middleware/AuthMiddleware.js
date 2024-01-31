const express = require("express");
const JWT = require("jsonwebtoken");
require("dotenv").config();
exports.AuthMiddleware = async (req, res, next) => {
  try {
    const Token = req.header("Authorization").replace("Bearer ", "");
    if (!Token) {
      return res.status(200).json({
        success: false,
        message: "Token is required",
      });
    }
    try {
      const decode = JWT.verify(Token, process.env.JWT_SECRET_KEY);
      req.User = decode;
    } catch (error) {
      return res
        .status(200)
        .json({ success: false, message: "token is invalid" });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Error in Auth Middleware" });
  }
};
