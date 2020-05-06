const express = require("express");
const app = express();
const path = require("path");
const authRoute = require("./auth/route.js");
const verify = require("./verify.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const dbRoute = require("./db/route");
const bodyParser = require("body-parser");

dotenv.config(); //secret things

mongoose
  .connect(
    "mongodb://localhost:27017/quiz-and-test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("connected to db");
    }
  )
  .catch((e) => console.log(e));

//middleware
app.use(express.json());
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//import route route
app.use("/api/user", authRoute);
app.use("/api/db", dbRoute);

//authentication
app.listen(4000, () => console.log("listening on port 4000"));
