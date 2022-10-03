// import helpers
import isEmpty from "../../helpers/isEmpty";
import { nameRegex } from "../../helpers/regex";

const addUserNameValidation = (req, res, next) => {
  let errors = {};
  let reqBody = req.body;
  let con = isEmpty(reqBody);
  if (con) {
    errors.message = "Name is Required.";
    return res.json({ status: false, data: errors });
  } else {
    let con1 = isEmpty(reqBody.name);
    let con2 = !nameRegex.test(reqBody.name);
    let con3 = reqBody.name.length < 5 || reqBody.name.length > 15;
    let handleValidate = {
      msg1: con1 && (errors.name = "Name field is required"),
      msg2:
        con1 == "" && con2 && (errors.name = "Please Enter Only Characters"),
      msg3:
        con2 == "" &&
        con3 &&
        (errors.name = "Your Character must be 5 to 15 Character"),
    };
    if (!isEmpty(errors)) {
      return res.json({ status: false, data: errors });
    }
  }

  return next();
};

const addUserProfileImageValidate = (req, res, next) => {
  let errors = {};
  let reqBody = req.body,
    reqFile = req.file;
  if (isEmpty(reqBody)) {
    errors.message = "Name, Image and  Description fields Required.";
    return res.json({ status: false, data: errors });
  } else {
    let con1 = isEmpty(reqBody.name);
    let con2 = !nameRegex.test(reqBody.name);
    let con3 = reqBody.name.length < 5 || reqBody.name.length > 15;
    let con4 = isEmpty(reqBody.description);
    let con5 = isEmpty(reqFile);
    let handleValidate = {
      msg1: con1 && (errors.name = "Name field is required"),
      msg2:
        con1 == "" && con2 && (errors.name = "Please Enter Only Characters"),
      msg3:
        con2 == "" &&
        con3 &&
        (errors.name = "Your Character must be 5 to 15 Character"),
      msg4: con4 && (errors.description = "Description field is required"),
      msg5: con5 && (errors.image = "Image field is required"),
    };
    if (!isEmpty(errors)) {
      return res.json({ status: false, data: errors });
    }
  }

  return next();
};

export { addUserNameValidation, addUserProfileImageValidate };
