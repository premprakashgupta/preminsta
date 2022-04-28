const { userAuth } = require("../auth/userAuth");
const {
  Register,
  Login,
  Logout,
  Following,
  LoadDataofAuthUser,
  Profile,
  Suggestion,
} = require("../controller/UserController");

const Router = require("express").Router();

Router.route("/newUser").post(Register);
Router.route("/login").post(Login);
Router.route("/me").get(userAuth, LoadDataofAuthUser);
Router.route("/accounts/:userId").get(Profile);
Router.route("/following/:id").put(userAuth, Following);
Router.route("/suggestion").get(userAuth, Suggestion);
Router.route("/logout").get(userAuth, Logout);

module.exports = Router;
