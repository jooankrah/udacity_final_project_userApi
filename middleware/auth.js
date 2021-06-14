const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(req.headers.authorization);

    const decoded = jwt.verify(token, "GodistheGreatest");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error("User not found");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.send({
      error: "Please authenticate.",
    });
  }
};

module.exports = auth;
