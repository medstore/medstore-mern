const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    required: [true, "Please provide Owner Id"],
  },
  storeId:{
    type: String,
    required: [true, "Please provide store Id"],
  },
  productId:{
    type: String,
    required: [true, "Please provide product Id"],
  },
  status:{
    type: String,
    required: [true, "Please provide Order status"],
  },
  quantity:{
    type: Number,
    required: [true, "Please provide Quantity"],
  },
},
{timestamps: true});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;