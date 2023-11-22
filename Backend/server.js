//call the module
const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./Middleware/errorhandler");

//define the port
const PORT = process.env.PORT || 8000;
const connect = require("./config/db");

//define the app
const app = express();
//define app json values transfer
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//user route
app.use("/api/users", require("./routes/userRoutes"));
//quiz route
app.use("/api/questionset", require("./routes/questionRoutes"));
//points route
app.use("/api/points", require("./routes/pointsRoutes"));
//error handler
app.use(errorHandler);
//listening the server
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
