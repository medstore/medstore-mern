const express = require('express');
const router = express.Router();
const {getuser, registerstore , addproduct} = require('../controllers/private');
const {protect} = require('../middleware/auth')

router.route("/getuser").get(protect, getuser);
router.route("/createstore/:userid").post(protect, registerstore);
router.route("/product").post(protect, addproduct);
module.exports = router;