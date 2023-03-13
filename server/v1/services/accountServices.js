const accountDB = require("./database/accountDB");

async function createAccount(data) {
    const accountCreated = await accountDB.addAccount(data);

    return ({
        isValid: true,
        message: "Account successfully created",
        data: accountCreated
    });
};

module.exports = { createAccount };