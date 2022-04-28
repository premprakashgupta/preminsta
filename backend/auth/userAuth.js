const UserSchema = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const jsonMsgHandler = require("../Globelfunctions/functons");

exports.userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      return jsonMsgHandler(res, 401, "", false, "Login again");
    }
    const varify = jwt.verify(token, process.env.JWT_SEC);
    if (!varify) {
      return jsonMsgHandler(res, 401, "", false, "Login again");
    }

    req.AllUserData = await UserSchema.findById(varify.data.id);

    next();
  } catch (error) {
    jsonMsgHandler(res, 401, "", true, error.message);
  }
};
