//models
import UserModel from "../models/UserModel";

const createUserName = async (req, res) => {
  try {
    let reqBody = req.body;
    let response = await UserModel.create(reqBody);

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

export { createUserName };
