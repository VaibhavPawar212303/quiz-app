const express = require("express");
const { getpointsbyid } = require("../controller/pointsController");
const router = require("express").Router();

//Get Points By User ID
router.delete("/getpoints/:id", getpointsbyid);
module.exports = router;
