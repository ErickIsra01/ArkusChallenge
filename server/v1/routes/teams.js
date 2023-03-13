const express = require("express");

const teamControllers = require("../controllers/team");
const authorization = require("../middlewares/authorization");
const rangeVerification = require("../middlewares/rangeVerification");

const app = express();

app.post('/createTeam', teamControllers.createTeam);
app.put('/updateTeam');
app.delete('/deleteTeam');

module.exports = app;