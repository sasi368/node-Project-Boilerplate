import express from "express";
import {
  addUserNameValidation,
  addUserProfileImageValidate,
} from "./validations/userValidations";
import { createUserImage, createUserName } from "../controllers/userController";
import multer from "multer";
import path from "path";

// For file upload
var storage = multer.diskStorage({
  destination: "./public/Images",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});
var upload = multer({
  storage: storage,
});

var upload = multer({ storage: storage });

const router = express();

router
  .route("/add-name")
  .post(multer().none(), addUserNameValidation, createUserName);

router
  .route("/add-profileImg")
  .post(upload.single("image"), addUserProfileImageValidate, createUserImage);

export default router;
