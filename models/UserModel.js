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

let registeredUsersSchema = new Schema({
  name: { type: String, required: true },
  email: String,
  password: String,
});

const usersName = mongoose.model("usersName", userNameSchema, "usersName");

const usersProfile = mongoose.model(
  "usersProfile",
  profileImgSchema,
  "usersProfile"
);

const registeredUsers = mongoose.model(
  "registeredUsers",
  registeredUsersSchema,
  "registeredUsers"
);

export { usersName, usersProfile, registeredUsers };
