const express = require("express");

const teamControllers = require("../controllers/team");
const authorization = require("../middlewares/authorization");
const rangeVerification = require("../middlewares/rangeVerification");

const app = express();

app.post('/createTeam', authorization, rangeVerification.superUserAndAdminRange, teamControllers.createTeam);
app.put('/updateTeam', authorization, rangeVerification.superUserAndAdminRange, teamControllers.updateTeam);
app.delete('/deleteTeam');

module.exports = app;