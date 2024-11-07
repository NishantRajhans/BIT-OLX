const UserSchema = require("../schema/UserSchema");
const ProductSchema = require("../schema/ProductSchema");
const { uploadImageToCloudinary } = require("../config/cloudinary");
const dotenv = require("dotenv");
dotenv.config();
exports.CreateProduct = async (req, res) => {
  try {
    const { ProductDescription, ProductCategory, ProductPrice, ProductTitle } =
      req.body;
    const ProductImage = req.file;
    if (
      !ProductImage ||
      !ProductCategory ||
      !ProductDescription ||
      !ProductPrice ||
      !ProductTitle
    ) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }
    const User = await UserSchema.findOne({ Email: req.User.Email });
    const ImageUrl = await uploadImageToCloudinary(ProductImage.path);
    const Product = await ProductSchema.create({
      ProductImage: ImageUrl.secure_url,
      ProductDescription: ProductDescription,
      ProductCategory: ProductCategory,
      ProductPrice: ProductPrice,
      ProductSeller: User,
      ProductTitle: ProductTitle,
      ProductCreatedAt: Date.now(),
    });
    const UpdateUser = await UserSchema.findByIdAndUpdate(
      { _id: User._id },
      {
        $push: {
          Products: Product._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Product Create Successfully",
      UpdateUser: UpdateUser,
      Product: Product,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "Error in creating product",
    });
  }
};
exports.EditProduct = async (req, res) => {
  try {
    const { ProductDescription, ProductPrice, ProductTitle } = req.body;
    const ProductImage = req.file;
    if (
      !ProductImage ||
      !ProductDescription ||
      !ProductPrice ||
      !ProductTitle
    ) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }
    const User = await UserSchema.findOne({ Email: req.User.Email });
    const ImageUrl = await uploadImageToCloudinary(ProductImage.path);
    const Product = await ProductSchema.findByIdAndUpdate(
      { _id: req.params.id },
      {
        ProductImage: ImageUrl.secure_url,
        ProductDescription: ProductDescription,
        ProductPrice: ProductPrice,
        ProductSeller: User,
        ProductTitle: ProductTitle,
      },{new:true}
    );
    return res.status(200).json({
      success: true,
      message: "Product Edited Successfully",
      Product: Product,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "Error in creating product",
    });
  }
};
exports.DeleteProduct = async (req, res) => {
  try {
    const ProductId = req.params.id;
    const Product = await ProductSchema.findByIdAndDelete({ _id: ProductId });
    const UpdateUser = await UserSchema.findOneAndUpdate(
      { Email: req.User.Email },
      {
        $pull: {
          Products: ProductId,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
      UpdateUser: UpdateUser,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "Error in deleting product",
    });
  }
};
exports.GetAllProducts = async (req, res) => {
  try {
    const Products = await ProductSchema.find({})
      .populate("ProductSeller")
      .exec();
    return res.status(200).json({
      success: true,
      message: "Get All Products Successfully",
      Products: Products,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "Error in get all products",
    });
  }
};
exports.GetProduct = async (req, res) => {
  try {
    const Product = await ProductSchema.findById({ _id: req.params.id })
      .populate("ProductSeller")
      .exec();
    return res.status(200).json({
      success: true,
      message: "Get Product Successfully",
      Product: Product,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "Error in get product",
    });
  }
};
exports.GetMyProduct = async (req, res) => {
  try {
    const UserEmail = req.User.Email;
    const User = await UserSchema.find({ Email: UserEmail })
      .populate("Products")
      .exec();
    return res.status(200).json({
      success: true,
      message: "Get My Product Successfully",
      Products: User[0].Products,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "Error in get my product",
    });
  }
};
exports.GetProductsByCategory = async (req, res) => {
  try {
    const Product = await ProductSchema.find({ProductCategory: req.params.Category})
      .populate("ProductSeller")
      .exec();
    return res.status(200).json({
      success: true,
      message: "Get Products Successfully",
      Product: Product,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "Error in get product by category",
    });
  }
};
