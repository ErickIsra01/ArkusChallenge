    const express = require("express");
const usersControllers = require("../controllers/users");
const authorization = require("../middlewares/authorization");
const rangeVerification = require("../middlewares/rangeVerification");

const app = express();

app.post("/createUser", usersControllers.createUser);
app.put("/updateUser", usersControllers.updateUser)

module.exports = app;