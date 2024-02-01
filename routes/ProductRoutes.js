const express = require('express')
const router=express.Router()
const {CreateProduct,EditProduct,DeleteProduct,GetAllProducts,GetMyProduct,GetProduct}=require("../controllers/ProductController")
const {AuthMiddleware}=require("../middleware/AuthMiddleware")
router.post("/CreateProduct",AuthMiddleware,CreateProduct);
router.delete("/DeletProduct/:id",AuthMiddleware,DeleteProduct);
router.get("/GetAllProducts",AuthMiddleware,GetAllProducts);
router.get("/GetMyProduct",AuthMiddleware,GetMyProduct);
router.get("/GetProduct/:id",AuthMiddleware,GetProduct);
router.post("/EditProduct/:id",AuthMiddleware,EditProduct);
module.exports = router