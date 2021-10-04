const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Store = require("../models/Store");
const Product = require("../models/Product");
const Order = require("../models/Order");
//get user data
exports.getuser = async (req, res, next) => {
    try {
        const {_id, firstname, lastname, email, cartItem, userAddress, storeId, ...other} = req.user;
        res.status(200).json({_id, firstname, lastname, email, cartItem, userAddress, storeId });
    } catch (err) {
        next(err);
    }
};

//Store registration
exports.registerstore = async (req, res, next) => {
    try {
        let list = {};
        const userExist = await User.findOne({ _id: req.body.userId});
        if (!userExist) {
            return res.status(404).json({ sucess: false, error: "User Not Found" })
        }
        if(req.body.userId !== req.params.userid){
            return res.status(409).json({ sucess: false, error: "Invalid User" })
        }
        req.body.addressList.map((obj)=>{
            list = {...list, ...obj}
        })
        const {storeName, ownerName, ownerEmail, storeAddress,userId, ...other} = req.body;
        const store = await Store.create({
            ownerId: userId,
            storeName: storeName,
            ownerName: ownerName,
            ownerEmail: ownerEmail,
            storeAddress: storeAddress,
            addressList: {...list}
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
       
        const userExist = await User.findOne({ _id: req.body.userId});
        if (!userExist) {
            return res.status(404).json({ sucess: false, error: "User Not Found" })
        }
         
        const {productName, productDescription,productImage, productPrice,productDetails, storeId} = req.body;

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

exports.getallOrderedProduct = async (req, res, next) => {
    try {
        // console.log(req.body.storeId);
         const storeExist = await Store.findById({ _id: req.body.storeId});
        
        if (storeExist) {
            const orderExist = await Order.find({ storeId : req.body.storeId});
            const productExist = await Product.find({ storeId : req.body.storeId});
            const userExist = await User.findOne({_id: req.body.ownerId});
            if(!orderExist && !productExist && !userExist){
                return res.status(404).json({ sucess: false, error: "Product data unavailable" });
            }
            else{
                console.log(orderExist)
                console.log(productExist)
                console.log(userExist)
                return res.status(200).json({orders: orderExist ,products: productExist , users : userExist }); 
            }
 
        }
     
    } catch (err) {
        next(err);
        console.log(err)
    }
};