const express = require("express");
const usersControllers = require("../controllers/users");
const authorization = require("../middlewares/authorization");
const rangeVerification = require("../middlewares/rangeVerification");

const app = express();

app.post("/createUser", authorization, rangeVerification.superUserAndAdminRange, usersControllers.createUser);
app.put("/updateUser", authorization, usersControllers.updateUser)

module.exports = app;