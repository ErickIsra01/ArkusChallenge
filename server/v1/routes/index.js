const express = require("express");

const app = express();

app.use("/users", require("./users"));
app.use("/accounts", require("./account"));
app.use("/session", require("./session"));
app.use("/teams", require("./teams"));

module.exports = app;