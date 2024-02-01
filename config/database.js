require("dotenv").config();
const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;
exports.connect = () => {
  mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Database connection established");
    })
    .catch((err) => {
      console.log("Database connection error");
      console.log(err);
    });
};