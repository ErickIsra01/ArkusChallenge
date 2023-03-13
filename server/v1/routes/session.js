const express = require("express");
const loginController = require("../controllers/session");

const app = express();

app.post("/login", loginController.login);

module.exports = app;