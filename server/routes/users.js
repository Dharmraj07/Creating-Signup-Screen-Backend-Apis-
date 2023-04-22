const { signup } = require("../controllers/usersControllers");
//const User = require("../models/users");

const express=require('express');
const router=express.Router();

router.post('/signup', signup);
module.exports = router;
