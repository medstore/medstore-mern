const express = require('express');
const router = express.Router();
const {getuser} = require('../controllers/private');
const {protect} = require('../middleware/auth')

router.route("/getuser").get(protect, getuser);
module.exports = router;