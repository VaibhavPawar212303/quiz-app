const client = require("../config/db");

//post method to create the question set
const createQuestionSet = (req, res) => {
  const user_id = req.body.user_id;
  const questionset_id = req.body.questionset_id;
  const questionset_name = req.body.questionset_name;
  const questionset_desc = req.body.questionset_desc;
  try {
    var query = `INSERT INTO questiondata (user_id,questionset_id, questionset_name, questionset_desc) VALUES ('${user_id}','${questionset_id}','${questionset_name}','${questionset_desc}');`;
    client.query(query, function (err) {
      if (err) throw err;
      else {
        //Alter the points of player 
        //get the user points first 
        var query = `SELECT points from pointsdata WHERE user_id='${user_id}';`;
        client.query(query, function (err, result) {
          if (err) throw err;
          else {
            var points = parseInt(result.rows[0].points) + 5;
            var query = `UPDATE pointsdata 
                         SET points='${points}' 
                         WHERE user_id='${user_id}';`;
            client.query(query, function (err) {
              if (err) throw err;
              res
                .status(200)
                .json({
                  message:
                    "Question set created successfully and 5 Points added to your account",
                });
            })
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//delete method to delete the question set
const deleteQuestionSet = (req, res) => {
  const questionsetData = req.params.id;
  console.log(questionsetData);
  res.status(200).json({ message: "Question set deleted successfully" });
};

module.exports = { createQuestionSet, deleteQuestionSet };
