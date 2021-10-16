const express = require('express');
const router = express.Router();
const {signin, signup, updateuser} = require('../controllers/auth')

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/updateuserdata").post(updateuser);

module.exports = router;