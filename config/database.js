const mongoose = require('mongoose');
require("dotenv").config();
const MONGODB_URL=process.env.MONGODB_URL;
const DBconnection=mongoose.connect(MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Db connection established")).catch((err)=>{
    console.log("db connection error")
    console.log(err)
    process.exit(1)
})
export default DBconnection;