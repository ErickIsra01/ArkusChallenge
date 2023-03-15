const express = require("express");

const teamControllers = require("../controllers/team");
const authorization = require("../middlewares/authorization");
const rangeVerification = require("../middlewares/rangeVerification");

const app = express();

app.post('/createTeam', authorization, rangeVerification.superUserAndAdminRange, teamControllers.createTeam);

app.put('/updateTeam', authorization, rangeVerification.superUserAndAdminRange, teamControllers.updateTeam);
app.put('/addToAccount', authorization, rangeVerification.superUserAndAdminRange, teamControllers.addToAccount)

app.delete('/deleteTeam', authorization, rangeVerification.superUserAndAdminRange, teamControllers.deleteTeam);

app.get('/getOneTeam', authorization, rangeVerification.superUserAndAdminRange, teamControllers.getOneTeam)
app.get('/getAllTeams', authorization, rangeVerification.superUserAndAdminRange, teamControllers.getAllTeams)

module.exports = app;