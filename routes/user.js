import express from "express";
import {
  addUserNameValidation,
  addUserProfileImageValidate,
  registerValidation,
  LoginValidation,
  changePasswordValidate,
} from "./validations/userValidations";
import {
  createUserImage,
  createUserName,
  userRegister,
  userLogin,
  changePassword,
} from "../controllers/userController";
import { upload, defaultVal } from "../middlewares/multerFileUpload";
import { verifyToken } from "../middlewares/authjwt";

const router = express();

router
  .route("/add-name")
  .post(defaultVal, addUserNameValidation, createUserName);

router
  .route("/add-profileImg")
  .post(upload.single("image"), addUserProfileImageValidate, createUserImage);

router.route("/register").post(defaultVal, registerValidation, userRegister);

router.route("/login").post(defaultVal, LoginValidation, userLogin);

router
  .route("/change-password")
  .post(defaultVal, verifyToken, changePasswordValidate, changePassword);

export default router;
