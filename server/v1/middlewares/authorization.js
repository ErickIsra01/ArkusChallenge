const tokensDB = require("../services/database/tokensDB");
const userDB = require("../services/database/usersDB");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const firewall = async (req, res, next) => {
    try{
        const bearer = req.headers.authorization.split(" ")[1];
        if(!bearer) return (res.status(401).send("Unauthorized"));
        const tokenFound = await tokensDB.findByToken(bearer);
        if(!tokenFound) return (res.status(401).send("Unauthorized"));
        const user = await userDB.findById(tokenFound.userID);
        if(!user) return (res.status(401).send("Unauthorized"));
        jwt.verify(bearer, process.env.TOKEN_SECRET, (error, decoded) => {
            if(error) {
                return (res.status(401).send("Unauthorized"));
            }
        });
        return next();
    } catch (error) {
        return (res.status(401).send("Unauthorized"));
    }
}

module.exports = firewall;