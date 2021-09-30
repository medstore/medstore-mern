const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
   
  productName: {
    type: String,
    required: [true, "Please provide Productname"],
  },
  productDescription: {
    type: String,
    required: [true, "Please provide ProductDescription"],
  },
  productImage: {
    type: String,
    required: [true, "Please provide ProductUrl"],
},
  productPrice: {
    type: Number,
    required: [true, "Please provide productPrice"],
  },
  productDetails: {
    type: String,
    required: [true, "Please provide productDetails"],
  },
},
{timestamps: true});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;