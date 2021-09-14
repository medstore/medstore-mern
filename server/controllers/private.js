const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Store = require("../models/Store");

//get user data
exports.getuser = async (req, res, next) => {
    try {
        const {_id, firstname, lastname, email, ...other} = req.user;
        res.status(200).json({_id, firstname, lastname, email});
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
        res.status(200).json({ sucess: true, message: "Store Created Successfully" });
    } catch (err) {
        next(err);
        console.log(err)
    }
};