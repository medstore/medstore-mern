const express = require('express');
const router = express.Router();
const {getuser, registerstore , addproduct, searchProduct, getsingleproduct, additemtocart} = require('../controllers/private');
const {protect} = require('../middleware/auth')

router.route("/getuser").get(protect, getuser);
router.route("/createstore/:userid").post(protect, registerstore);
router.route("/product").post(protect, addproduct);
router.route("/searchproduct").post(protect, searchProduct);
router.route("/getsingleproduct/:productId").get(getsingleproduct);
router.route("/additemtocart").post(protect, additemtocart);
module.exports = router;