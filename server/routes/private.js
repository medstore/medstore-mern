const express = require('express');
const router = express.Router();
const {getuser, registerstore , addproduct ,getallStoreProduct , getallOrderedProduct} = require('../controllers/private');
const {protect} = require('../middleware/auth')

router.route("/getuser").get(protect, getuser);
router.route("/createstore/:userid").post(protect, registerstore);
router.route("/storedashboard/addstoreproduct").post(protect, addproduct);
router.route("/storedashboard/allstoreproduct").post(protect, getallStoreProduct);
router.route("/storedashboard/orders").post(protect, getallOrderedProduct);
module.exports = router;