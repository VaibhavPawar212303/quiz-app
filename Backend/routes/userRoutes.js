const express = require("express");
const router = require("express").Router();

const { getUserById } = require("../controller/userController");

//user get call 
router.get("/getuserbyid/:id", getUserById);


module.exports = router;
