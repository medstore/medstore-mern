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


exports.searchProduct = async (req, res, next) => {
    try {
        const locationName = req.body.locationName;
        const location = req.body.location;
        const query = {};
        query[`addressList.${locationName}`] = location;
        const storeData = await Store.find(query);
        if(storeData.length == 0){
            return res.status(200).json({message: "No store found near your location"});
        }
        storeData.forEach((obj) => {
            const getProduct = async () => {
                let search = req.body.searchValue;
                let product = await Product.find({ "storeId": obj._id, "productName": new RegExp(`\\b${search}\\b`, 'i') });
                if(product.length == 0){
                    return res.status(200).json({message: "No product found"});
                }
                res.status(200).json({product: product, stores: obj});
            }
            getProduct();
        })
    } catch (err) {
        next(err);
        console.log(err)
    }
}