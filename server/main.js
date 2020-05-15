const express = require("express");
const app = express();
const path = require("path");
const authRoute = require("./auth/route.js");
const verify = require("./verify.js");
const mongoose = require("mongoose");
const cors = require("cors");
const dbRoute = require("./db/route");
const bodyParser = require("body-parser");

require("dotenv").config();
mongoose
  .connect(
    process.env.DB_CONNECT,
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
