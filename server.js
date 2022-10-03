import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
// import routes
import user from "./routes/user";

// config
let ConfigSetUp = require("./configs/config"),
  config = new ConfigSetUp();

const app = express();

//api setup
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});
app.get("/", (req, res) => {
  return res.send("Service Working Fine");
});

// eg: url:http://127.0.0.1:7000/users/add-name
//   method:post
//   param:name
//   type:raw data json format
//multer for form data
app.use("/users", user); // for user routes
//

//MongoDB connection using mongoose
mongoose.connect(config.mongoDbUrl);
mongoose.connection
  .once("open", function () {
    console.log("Db connected Successfully");
  })
  .on("error", function (err) {
    console.log("Error in db connection", err);
  });
