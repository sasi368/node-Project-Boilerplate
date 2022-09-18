// import helpers
import isEmpty from "../../helpers/isEmpty";
import { nameRegex } from "../../helpers/regex";

const addUserName = (req, res, next) => {
  let errors = {};
  let reqBody = req.body;
  let con1 = isEmpty(reqBody.name);
  let con2 = !nameRegex.test(reqBody.name);
  let con3 = reqBody.name.length < 5 || reqBody.name.length > 15;
  let handleValidate = {
    msg1: con1 && (errors.name = "Name field is required"),
    msg2: con1 == "" && con2 && (errors.name = "Please Enter Only Characters"),
    msg3:
      con2 == "" &&
      con3 &&
      (errors.name = "Your Character must be 5 to 15 Character"),
  };
  if (!isEmpty(errors)) {
    return res.json({ status: false, data: errors });
  }
  return next();
};

export { addUserName };
