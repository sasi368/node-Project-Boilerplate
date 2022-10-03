//models
import { usersName, usersProfile } from "../models/UserModel";
const fileSystem = require("fs");
const path = require("path");
const multer = require("multer");

// For file upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/Images");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

const createUserName = async (req, res) => {
  try {
    let reqBody = req.body;
    let response = await usersName.create(reqBody);
    if (response) {
      return res.json({
        status: true,
        message: "User Name added Successfully",
        resp: response,
      });
    }
  } catch (err) {
    console.log("err createUserName", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

const createUserImage = async (req, res) => {
  try {
    let reqBody = {
      name: req.body.name,
      description: req.body.description,
      image: req.file.filename,
    };
    let response = await usersProfile.create(reqBody);
    if (response) {
      return res.json({
        status: true,
        message: "User Profile added Successfully",
        resp: response,
      });
    }
  } catch (err) {
    console.log("err createUserName", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

export { createUserName, createUserImage };
