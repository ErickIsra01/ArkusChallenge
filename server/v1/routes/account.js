const express = require("express");

const accountControllers = require("../controllers/account");
const rangeVerification = require("../middlewares/rangeVerification");

const app = express();

const authorization = require("../middlewares/authorization")

app.post("/createAccount",authorization, rangeVerification.superUserAndAdminRange, accountControllers.createAccount);
app.put('/updateAccount', authorization, rangeVerification.superUserAndAdminRange, accountControllers.updateAccount);
app.delete('/deleteAccount');

module.exports = app;