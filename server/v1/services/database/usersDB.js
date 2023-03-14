const usersModel = require("../../models/usersModel");
const tokensModel = require("../../models/tokensModel");

async function addUser(data) {
    const user = new usersModel(data);
    const addedUser = user.save();
    return addedUser;
}

async function updateUser(filter, data) {
    const user = usersModel.findOneAndUpdate(filter, data);
    return user;
}

async function deleteUser(id) {
    const user = usersModel.findOneAndDelete(id);
    return user;
}

async function findByMail(email) {
    const user = await usersModel.findOne({ email });
    return user;
};

async function findById(id) {
    const user = await usersModel.findById(id);
    return user;
}

async function findByToken(token) {
    const user = await tokensModel.findOne({ token });
    return user;
}

module.exports = { findByMail, findById, findByToken, addUser, updateUser, deleteUser };
