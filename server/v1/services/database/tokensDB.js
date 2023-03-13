const tokensModel = require("../../models/tokensModel");

async function addToken(token) {
    const newToken = new tokensModel(token);
    const savedToken = await newToken.save();
    return savedToken;
};

async function findByToken(token) {
    const tokenFound = tokensModel.findOne({ token });
    return tokenFound;
}

module.exports = { addToken, findByToken };