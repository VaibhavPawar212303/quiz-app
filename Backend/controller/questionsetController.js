//post method to create the question set
const createQuestionSet = (req, res) => {
  const questionsetData = req.body;

  res.status(200).json({ message: "Question set created successfully" });
};

//delete method to delete the question set
const deleteQuestionSet = (req, res) => {
  const questionsetData = req.params.id;
  console.log(questionsetData);
  res.status(200).json({ message: "Question set deleted successfully" });
};
module.exports = { createQuestionSet, deleteQuestionSet };
