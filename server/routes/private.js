const express = require('express');
const router = express.Router();
const {getuser, registerstore , addproduct, searchProduct, getsingleproduct, additemtocart, getAllCartItem, removeitemfromcart, buyproduct} = require('../controllers/private');
const {protect} = require('../middleware/auth')

router.route("/getuser").get(protect, getuser);
router.route("/createstore/:userid").post(protect, registerstore);
router.route("/product").post(protect, addproduct);
router.route("/searchproduct").post(protect, searchProduct);
router.route("/getsingleproduct/:productId").get(getsingleproduct);
router.route("/additemtocart").post(protect, additemtocart);
router.route("/getallcartitem").post(protect, getAllCartItem);
router.route("/removeitemfromcart").post(protect, removeitemfromcart);
router.route("/buyproduct").post(protect, buyproduct);
  //
module.exports = router;