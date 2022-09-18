import express from "express";
import { addUserName } from "./validations/userValidations";
import { createUserName } from "../controllers/userController";

const router = express();

router.route("/add-name").post(addUserName, createUserName);

export default router;
