const express = require("express");
const router = require("express").Router();
const {
  createQuestionSet,
  deleteQuestionSet,
} = require("../controller/questionsetController");

//post get call
router.post("/createquestionset/", createQuestionSet);
router.delete("/deletequestionset/:id", deleteQuestionSet);
module.exports = router;
