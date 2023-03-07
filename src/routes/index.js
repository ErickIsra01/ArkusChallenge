const express = require("express");

const app = express();

app.use("/login", require("./login"));

module.exports = app;