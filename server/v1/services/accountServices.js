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

async function deleteAccount(data) {
    const accountDeleted = await accountDB.deleteAccount({_id: data.idAccount});

    return ({
        isValid: true,
        message: "Account retreived successfully",
        data: accountDeleted
    });
};

async function getAllAccounts() {
    const accounts = await accountDB.find({}, { __v: 0 });

    return ({
        isValid: true,
        message: "Accounts retrieved successfully",
        data: accounts
    });
};

async function getOneAccount(data) {
    const accounts = await accountDB.findById(data.idAccount);

    return ({
        isValid: true,
        message: "Accounts retrieved successfully",
        data: accounts
    });
};

module.exports = { createAccount, updateAccount, deleteAccount, getAllAccounts, getOneAccount };