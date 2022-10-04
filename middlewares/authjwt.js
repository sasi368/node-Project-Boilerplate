import jwt from "jsonwebtoken";
let ConfigSetUp = require("../configs/config"),
  config = new ConfigSetUp();

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"]; //pass x-access-token as a key in post man header
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export { verifyToken };
