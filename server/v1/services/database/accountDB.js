const accountModel = require("../../models/accountsModel");

async function addAccount(accountData) {
    const account = new accountModel(accountData);
    const addedAccount = await account.save();
    return addedAccount;
}

async function findByName(name) {
    const accounts = await accountModel.findOne({ accountName: name });
    return accounts;
};

async function updateAccount(id, data) {
    const account = accountModel.findOneAndUpdate(id, data);
    return account
}
module.exports = { findByName, addAccount, updateAccount };