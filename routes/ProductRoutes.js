const express = require('express')
const upload =require("../middleware/MulterMiddleware")
const router=express.Router()
const {CreateProduct,EditProduct,DeleteProduct,GetAllProducts,GetMyProduct,GetProduct,GetProductsByCategory}=require("../controllers/ProductController")
const {AuthMiddleware}=require("../middleware/AuthMiddleware")
router.post("/CreateProduct",upload.single("ProductImage"),AuthMiddleware,CreateProduct);
router.delete("/DeletProduct/:id",AuthMiddleware,DeleteProduct);
router.get("/GetAllProducts",AuthMiddleware,GetAllProducts);
router.get("/GetProductsByCategory/:Category",AuthMiddleware,GetProductsByCategory);
router.get("/GetMyProducts",AuthMiddleware,GetMyProduct);
router.get("/GetProduct/:id",AuthMiddleware,GetProduct);
router.put("/EditProduct/:id",upload.single("ProductImage"),AuthMiddleware,EditProduct);
module.exports = router