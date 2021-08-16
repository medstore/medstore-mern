const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

//get user data
exports.getuser = async (req, res, next) => {
    try {
        const {_id, firstname, lastname, email, ...other} = req.user;
        res.status(200).json({_id, firstname, lastname, email});
    } catch (err) {
        next(err);
    }
};