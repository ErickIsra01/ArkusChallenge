const jwt = require("jsonwebtoken");

const userDB = require("../services/database/usersDB");
const tokenDB = require("../services/database/tokensDB");
const loginDTO = require("../controllers/DTOs/sessionDTO");

require("dotenv").config();

async function login(data) {
    const user = await userDB.findByMail(data.email);
    const token = jwt.sign(user._id.toString(), process.env.TOKEN_SECRET);
    const addedToken = await tokenDB.addToken({
        userID: user._id,
        token
    });
    const filteredData = loginDTO.outputLoginDTO(addedToken, user);
    return ({ isValid: true, message: "User logged in successfully", data: filteredData});
};

module.exports = { login };