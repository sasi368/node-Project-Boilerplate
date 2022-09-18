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

const usersName = mongoose.model("usersName", userNameSchema, "usersName");

export default usersName;
