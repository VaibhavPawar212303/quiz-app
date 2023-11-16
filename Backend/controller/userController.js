const client = require("../config/db");
const jwt = require("jsonwebtoken");

const getUserById = (req, res) => {
  const id = req.params.id;
  try {
    var query = `SELECT * FROM userdata WHERE user_id = '${id}';`;
    client.query(query, function (err, result) {
      if (err) throw err;
      res.status(200).json({ user: result.rows[0], token: generateToken() });
    });
  } catch (error) {
    console.log(error);
  }
  console.log("Access the user by id");
};

//JWT Token Creation
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { getUserById };
