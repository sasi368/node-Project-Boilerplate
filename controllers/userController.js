//models
import { usersName, usersProfile, registeredUsers } from "../models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
let ConfigSetUp = require("../configs/config"),
  config = new ConfigSetUp();

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
    console.log("err createUserImage", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

//register
const userRegister = async (req, res) => {
  try {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let reqBody = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    let response = await registeredUsers.create(reqBody);
    if (response) {
      // create a token
      var token = jwt.sign({ id: response._id }, config.secret, {
        expiresIn: 86400, // expires in 24 hours
      });
      res.status(200).send({
        status: true,
        auth: true,
        token: token,
        message: "Registered Successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        errors: { messages: "There was a problem registering the user." },
      });
    }
  } catch (err) {
    console.log("err userRegister", err);
    return res.status(500).json({
      success: false,
      errors: { messages: "Error on server" },
    });
  }
};

//Login
const userLogin = async (req, res) => {
  try {
    let findUser = await registeredUsers.findOne({ email: req.body.email });

    if (findUser) {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        findUser.password
      );
      if (!passwordIsValid)
        return res
          .status(401)
          .send({ auth: false, token: null, message: "Incorrect Password!" });

      var token = jwt.sign({ id: findUser._id }, config.secret, {
        expiresIn: 86400, // expires in 24 hours
      });

      return res
        .status(200)
        .send({ auth: true, token: token, message: "Login Successfully" });
    } else if (!findUser) {
      return res.status(404).json({ message: "No Users Found!" });
    } else
      return res.status(400).json({
        success: false,
        errors: { messages: "There was a problem in Login" },
      });
  } catch (err) {
    console.log("err userLogin", err);
    return res.status(500).json({
      success: false,
      errors: { messages: "Error on server" },
    });
  }
};

//change password
const changePassword = async (req, res) => {
  try {
    let reqBody = req.body;
    let checkUser = await registeredUsers.findOne({ _id: reqBody.id });
    var passwordStatus = bcrypt.compareSync(
      reqBody.oldPassword,
      checkUser.password
    );
    if (!passwordStatus) {
      return res.json({
        status: false,
        errors: { oldPassword: "Password incorrect" },
      });
    } else {
      var hashedPassword = bcrypt.hashSync(reqBody.newPassword, 8);
      var updatePassword = await registeredUsers.findOneAndUpdate(
        { _id: reqBody.id },
        { $set: { password: hashedPassword } },
        { new: true }
      );
      if (updatePassword) {
        return res.json({
          status: true,
          message: "Password Changed Successfully",
        });
      }
    }
  } catch (err) {
    console.log("err changePassword+++++++", err);
    return res.status(500).json({
      success: false,
      errors: { messages: "Error on server" },
    });
  }
};

export {
  createUserName,
  createUserImage,
  userRegister,
  userLogin,
  changePassword,
};
