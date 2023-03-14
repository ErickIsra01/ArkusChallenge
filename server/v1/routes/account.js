const express = require("express");

const accountControllers = require("../controllers/account");
const rangeVerification = require("../middlewares/rangeVerification");

const app = express();

const authorization = require("../middlewares/authorization")

app.post("/createAccount",authorization, rangeVerification.superUserAndAdminRange, accountControllers.createAccount);

app.put('/updateAccount', authorization, rangeVerification.superUserAndAdminRange, accountControllers.updateAccount);

app.delete('/deleteAccount', authorization, rangeVerification.superUserAndAdminRange, accountControllers.deleteAccount);

app.get('/getOneAccount', authorization, accountControllers.getOneAccount);
app.get('/getManyAccounts')

module.exports = app;