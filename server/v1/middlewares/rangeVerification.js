const usersDB = require("../services/database/usersDB");

const jwt = require("jsonwebtoken");

require('dotenv').config();

const superUserRange = async(req, res, next) => {
    const userData = await usersDB.findByToken(req.headers.authorization.split(" ")[1]);

    if(userData.range !== "superuser") {
        return(res.status(403).send({
            isValid: false,
            message: "Don't have permissions to access this resource",
            data: null
        }));
    }

    return next();
}

const superUserAndAdminRange = async (req, res, next) => {
    const idUser = jwt.verify(req.headers.authorization.split(" ")[1], process.env.TOKEN_SECRET);
    const userData = await usersDB.findById(idUser);
    if(userData.range !== "superuser" && "admin") {
        return(res.status(403).send({
            isValid: false,
            message: "Don't have permissions to access this resource",
            data: null
        }));
    }

    return next();
}
module.exports = { superUserRange, superUserAndAdminRange };