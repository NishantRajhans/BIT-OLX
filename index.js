const express=require('express')
const app = express()
const DBconnection=require("./config/database")
const AuthRoutes=require("./routes/AuthRoutes")
const ProductRoutes=require("./routes/ProductRoutes")
const UserRoutes=require("./routes/UserRoutes")
const cors=require("cors")
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const PORT=process.env.PORT ||3000
dotenv.config();
app.use(bodyParser.json())
app.use(cors())
app.use("/api/v1/Auth",AuthRoutes);
app.use("/api/v1/User",UserRoutes);
app.use("/api/v1/Product",ProductRoutes);
DBconnection.connect()
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})