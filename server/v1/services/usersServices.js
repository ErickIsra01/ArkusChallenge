const usersDB = require("./database/usersDB");
const teamDB = require("../services/database/teamDB");
const usersDTO = require("../controllers/DTOs/usersDTO");
const bcrypt = require('bcryptjs');

async function userRegistration(data) {
    const encryptedPassword = await bcrypt.hash(data.password, 10);
    data.password = encryptedPassword;

    const createdUser = await usersDB.addUser(data);

    return ({
        isValid: true,
        message: `${createdUser.range} created successfully`,
        data: createdUser
    });
};

async function updateUser(data) {
    const updatedUser = await usersDB.updateUser({_id: data.idUser}, data.data);
    
    return({
        isValid: true,
        message: "User updated successfully",
        data: updatedUser
    })
};

module.exports = { userRegistration, updateUser };