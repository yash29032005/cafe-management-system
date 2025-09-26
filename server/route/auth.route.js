const express = require("express");
const {
  login,
  register,
  me,
  logout,
} = require("../controller/auth.controller");
const { protect } = require("../middleware/getAuth");
const Router = express.Router();

Router.post("/login", login);
Router.post("/register", register);
Router.get("/me", protect, me);
Router.get("/logout", logout);

module.exports = Router;
