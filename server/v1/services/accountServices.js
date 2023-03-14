const accountDB = require("./database/accountDB");

async function createAccount(data) {
    const accountCreated = await accountDB.addAccount(data);

    return ({
        isValid: true,
        message: "Account created successfully",
        data: accountCreated
    });
};

async function updateAccount(data) {
    const accountUpdated = await accountDB.updateAccount({_id: data.idAccount}, data.data);

    return ({
        isValid: true,
        message: "Account updated successfully",
        data: accountUpdated
    });
}

module.exports = { createAccount, updateAccount };