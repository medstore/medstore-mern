const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: [true, "Please provide customerId"],
    },
    customerName: {
        type: String,
        required: [true, "Please provide customerName"],
    },
    storeId: {
        type: String,
        required: [true, "Please provide storeId"],
    },
    productId: {
        type: String,
        required: [true, "Please provide productId"],
    },
    status: {
        type: String,
        default: "ordered",
    },
    quantity: {
        type: String,
        required: [true, "Please provide quantity"],
    },
    totalPrice: {
        type: String,
        required: [true, "Please provide totalPrice"],
    },
},
    { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;