require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require(`./${process.env.VERSION}/config/swagger.json`);
const APIVersion = require(`./${process.env.VERSION}/routes`);
const app = express();

require(`./${process.env.VERSION}/config/database`);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(bodyParser.json());

app.use(`/api/${process.env.VERSION}`, APIVersion);

app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req, res, next) => {
    return res.status(404).send({
        isValid: false,
        message: `URL ${req.url} not found`,
        data: null
    })
});


app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});

module.exports = app;