const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Store = require("../models/Store");
const Product = require("../models/Product");

const Order = require('../models/Order')
 
//get user data
exports.getuser = async (req, res, next) => {
    try {
        const { _id, firstname, lastname, email, cartItem, userAddress, storeId, ...other } = req.user;
        res.status(200).json({ _id, firstname, lastname, email, cartItem, userAddress, storeId });
    } catch (err) {
        next(err);
    }
};

exports.getsingleproduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ sucess: false, error: "Product not found" });
        }
    } catch (err) {
        next(err);
    }
};

exports.additemtocart = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.userId);
        if (user) {
            await user.updateOne({ $push: { cartItem: req.body.productId } });
            res.status(200).json(req.user);
        } else {
            res.status(404).json({ sucess: false, error: "Error Occured" });
        }
    } catch (err) {
        next(err);
    }
};

exports.removeitemfromcart = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.userId);
        if (user) {
            await user.updateOne({ $pull: { cartItem: req.body.productId } });
            res.status(200).json(req.user);
        } else {
            res.status(404).json({ sucess: false, error: "Error Occured" });
        }
    } catch (err) {
        next(err);
    }
};

exports.getAllCartItem = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const cartItem = await Promise.all(
            currentUser.cartItem.map((itemId) => {
                return Product.findById(itemId);
            })
        );
        res.status(200).json(cartItem);
    } catch (err) {
        next(err);
    }
};

//Store registration
exports.registerstore = async (req, res, next) => {
    try {
        let list = {};
        const userExist = await User.findOne({ _id: req.body.userId });
        if (!userExist) {
            return res.status(404).json({ sucess: false, error: "User Not Found" })
        }
        if (req.body.userId !== req.params.userid) {
            return res.status(409).json({ sucess: false, error: "Invalid User" })
        }
        req.body.addressList.map((obj) => {
            list = { ...list, ...obj }
        })
        const { storeName, ownerName, ownerEmail, storeAddress, userId, latitude, longitude, ...other } = req.body;
        const store = await Store.create({
            ownerId: userId,
            storeName: storeName,
            ownerName: ownerName,
            latitude: latitude,
            longitude: longitude,
            ownerEmail: ownerEmail,
            storeAddress: storeAddress,
            addressList: { ...list }
        });

        const user = await User.findById(req.body.userId);
        if (user) {
            await user.updateOne({ $set: { storeId: store._id } });
        }
        res.status(200).json({ sucess: true, message: "Store Created Successfully" });
    } catch (err) {
        next(err);
        console.log(err)
    }
};

//Add Product

exports.addproduct = async (req, res, next) => {
    try {

        const userExist = await User.findOne({ _id: req.body.userId });
        if (!userExist) {
            return res.status(404).json({ sucess: false, error: "User Not Found" })
        }

        const { productName, productDescription, productImage, productPrice, productDetails, storeId } = req.body;

        const product = await Product.create({
            storeId: storeId,
            productName: productName,
            productDescription: productDescription,
            productImage: productImage,
            productPrice: productPrice,
            productDetails: productDetails
        });
        res.status(200).json({ sucess: true, message: "Product Added Successfully" });
    } catch (err) {
        next(err);
        console.log(err)
    }
};

 
exports.getallStoreProduct = async (req, res, next) => {
    try {
        // console.log(req.body.storeId);
         const storeExist = await Store.findById({ _id: req.body.storeId});
        
        if (storeExist) {
            const productExist = await Product.find({ storeId : req.body.storeId});
            
            if(!productExist){
                return res.status(404).json({ sucess: false, error: "Product data unavailable" });
            }
            else{
                console.log(productExist)
                return res.status(200).json({products: productExist}); 
            }
 
        }
    } catch (err) {
        next(err);
        console.log(err)
    }
};
 
exports.buyproduct = async (req, res, next) => {
    try {
        const receiveItem = req.body;
        for (const obj of receiveItem) {
            const { customerId, customerName, storeId, totalPrice } = obj;
            const productId = obj._id;
            const quantity = obj.orderQuantity;

            const order = await Order.create({
                customerId: customerId,
                customerName: customerName,
                storeId: storeId,
                totalPrice: totalPrice,
                productId: productId,
                quantity: quantity
            });
        }

        res.status(200).json({ sucess: true, message: "Order Successfull" });
 
    } catch (err) {
        next(err);
        console.log(err)
    }
};

 
exports.getallOrderedProduct = async (req, res, next) => {
    try {
        // console.log(req.body.storeId);
         const storeExist = await Store.findById({ _id: req.body.storeId});
        
        if (storeExist) {
            const orderExist = await Order.find({ storeId : req.body.storeId});

            let result = orderExist.map(a => a.productId);
                // console.log(result)
            const productExist = await Product.find({ _id : result});
            
            if(!orderExist && !productExist){
                return res.status(404).json({ sucess: false, error: "Product data unavailable" });
            }
            else{
                // console.log(orderExist)
                console.log(productExist)
                
                return res.status(200).json({orders: orderExist ,products: productExist }); 
            }
 
        }
    } catch (err) {
        next(err);
        console.log(err)
    }
 
};
exports.searchProduct = async (req, res, next) => {
    try {
        const prod = [];
        const nearByStores = [];
        const locationName = req.body.locationName;
        const location = req.body.location;
        const query = {};
        query[`addressList.${locationName}`] = location;
        const storeData = await Store.find(query);
        if (storeData.length == 0) {
            return res.status(200).json({ message: "No store found near your location" });
        }
        for (const obj of storeData) {

            let search = req.body.searchValue.split(" ")[0];
            let product = await Product.find({ "storeId": obj._id, "productName": new RegExp(`\\b${search}\\b`, 'i') });
            if (product.length != 0) {
                nearByStores.push(obj);
                prod.push(...product);
            }
        }
        if (prod.length == 0) {
            return res.status(200).json({ message: "No product found" });
        }
        res.status(200).json({ product: prod, stores: nearByStores });
 
    } catch (err) {
        next(err);
        console.log(err)
    }
 
};

exports.getStoreDetails = async (req, res, next) => {
    try {
        // console.log(req.body.storeId);
         const storeExist = await Store.findById({ _id: req.body.storeId});
        
        if (!storeExist) {
            return res.status(404).json({ sucess: false, error: "Store data unavailable" });
        }
            else{
                console.log(storeExist)
                return res.status(200).json({store: storeExist}); 
            }
 
        }
     
    catch (err) {
        next(err);
        console.log(err)
    }
};
 

exports.getrandomproducts = async (req, res, next) => {
    try {
        let product = await Product.find();
        res.status(200).json(product);
    } catch (err) {
        next(err);
        console.log(err)
    }
}
 