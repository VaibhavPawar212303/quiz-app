const express = require("express");
const router = require("express").Router();

const {
  getUserById,
  createUser,
  loginUser,
} = require("../controller/userController");

//user get call
router.get("/getuserbyid/:id", getUserById);
//create user call
router.post("/createuser", createUser);
//login user
router.post("/loginuser", loginUser);

module.exports = router;
