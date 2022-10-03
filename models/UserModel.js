// import package
import mongoose from "mongoose";

//helpers
import { dateFormat1 } from "../helpers/dateTime";

const Schema = mongoose.Schema;

let userNameSchema = new Schema({
  name: { type: String, required: true },
  date: {
    type: String,
    default: dateFormat1,
  },
});

let profileImgSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  image: {
    type: String,
    default: "",
  },
});

const usersName = mongoose.model("usersName", userNameSchema, "usersName");

const usersProfile = mongoose.model(
  "usersProfile",
  profileImgSchema,
  "usersProfile"
);

export { usersName, usersProfile };
