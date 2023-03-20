const express = require("express");
const loginController = require("../controllers/session");

const app = express();

const authorization = require("../middlewares/authorization");

app.post("/login", loginController.login);
app.post("/verify", authorization, loginController.verify);

module.exports = app;