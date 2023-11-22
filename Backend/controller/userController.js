const client = require("../config/db");
const jwt = require("jsonwebtoken");

//Create a new user
const createUser = (req, res) => {
  const userdata = req.body;
  //check if user is already present
  try {
    var query = `SELECT * FROM userdata WHERE email = '${userdata.email}';`;
    client.query(query, function (err, result) {
      if (err) throw err;
      else if (result.rows.length > 0) {
        const useremail = result.rows[0].email;
        if (useremail === userdata.email) {
          res.status(200).json({
            message: "User Is Already Registered Please Use Another Email",
          });
        }
      } else {
        //create new user account
        try {
          const query = `INSERT INTO UserData(username,email,password,PhoneNo,City) VALUES('${userdata.username}','${userdata.email}','${userdata.password}',${userdata.PhoneNo},'${userdata.City}');`;
          client.query(query, function (err, result) {
            if (err) throw err;
            try {
              var query = `SELECT * FROM userdata WHERE email = '${userdata.email}';`;
              client.query(query, function (err, result) {
                if (err) throw err;
                res
                  .status(200)
                  .json({ user: result.rows[0], token: generateToken(result.rows[0].user_id) });
              });
            } catch (error) {
              console.log(error);
            }
          });
          client.query(query, function (err, result) {
            if (err) throw err;
            try {
              var query = `SELECT * FROM userdata WHERE email = '${userdata.email}';`;
              client.query(query, function (err, result) {
                if (err) throw err;
                res
                  .status(200)
                  .json({ user: result.rows[0], token: generateToken(result.rows[0].user_id) });
              });
            } catch (error) {
              console.log(error);
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//get the user by id
const getUserById = (req, res) => {
  const id = req.params.id;
  try {
    var query = `SELECT * FROM userdata WHERE user_id = '${id}';`;
    client.query(query, function (err, result) {
      if (err) throw err;
      res.status(200).json({ user: result.rows[0], token: generateToken(result.rows[0].user_id) });
    });
  } catch (error) {
    console.log(error);
  }
  console.log("Access the user by id");
};

//login user
const loginUser = (req, res) => {
  const userdata = req.body;
  if (!userdata.email || !userdata.password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //check if user is already present
  var query = `SELECT * FROM userdata WHERE email = '${userdata.email}';`;
  client.query(query, function (err, result) {
    if (result.rows.length == 0) {
      //create new user account
      res.status(400).json({ message: "Please Create your account" });
    } else if (result.rows.length > 0) {
      const useremail = result.rows[0].email;
      const userpass = result.rows[0].password;
      if (useremail === userdata.email && userpass === userdata.password) {
        res.status(200).json({ user: result.rows[0], token: generateToken(result.rows[0].user_id) });
      }
    }
  });
};

//JWT Token Creation
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { loginUser, createUser, getUserById };
