const accountModel = require("../../models/accountsModel");

async function addAccount(accountData) {
    const account = new accountModel(accountData);
    const addedAccount = await account.save();
    return addedAccount;
}

async function findById(id) {
    const account = await accountModel.findById(id);
    return account;
}

async function findByName(name) {
    const accounts = await accountModel.findOne({ accountName: name });
    return accounts;
};

async function updateAccount(id, data) {
    const account = accountModel.findOneAndUpdate(id, data);
    return account
}

async function deleteAccount(id) {
    const account = accountModel.findOneAndDelete(id);
    return account
}

async function find(data, parameters) {
    const accounts = await accountModel.find(data, parameters);
    return accounts;
}

module.exports = { findByName, addAccount, updateAccount, deleteAccount, findById, find };