const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.DB_URL, {})
    .then(() => {
        console.log(`Connected to database: ${process.env.DB_URL}`);
    })
    .catch((error) => {
        console.log(`Error connecting to the database: \n ${error}`);
    });
