const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Store = require("../models/Store");
const Product = require("../models/Product");
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
        if(req.body.userId !== req.params.userid){
            return res.status(409).json({ sucess: false, error: "Invalid User" })
        }
        
        const {productImage, productName, productDescription, productPrice,productDetails, userId, ...other} = req.body;
        const product = await Product.create({
            productId: productId,
            productImage: productImage,
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            productDetails: productDetails
        });
        res.status(200).json({ sucess: true, message: "Product Added Successfully" });
    } catch (err) {
        next(err);
        console.log(err)
    }
};