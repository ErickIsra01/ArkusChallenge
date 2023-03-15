const usersDB = require("./database/usersDB");
const teamDB = require("../services/database/teamDB");
const bcrypt = require('bcryptjs');
const movesDB = require("./database/movesDB");

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

async function deleteUser(data) {
    const deletedUser = await usersDB.deleteUser({_id: data.idUser});
    
    return({
        isValid: true,
        message: "User deleted successfully",
        data: deletedUser
    })
};

async function addToTeam(data, userData, teamData) {    
    data.data.startingDate = new Date();
    if(userData.move) {
        movesDB.updateMove({ _id: userData.idMove }, { finishingData: data.data.startingDate });
    }

    const createdMove = await movesDB.createMove(data.data);
    const outputUserData = await usersDB.updateUser({ _id: data.idUser }, { idMove: createdMove._id, idTeam: teamData._id });

    return({
        isValid: true,
        message: "User added to team successfully",
        data: {
            name: outputUserData.name,
            teamName: teamData.teamName
        }
    })
};

async function getOneUser(data) {    
    const teamData = await teamDB.findById(data.idTeam);

    const userData = {
        name: data.name,
        email: data.email,
        range: data.range,
        englishLevel: data.englishLevel,
        techKnowledge: data.techKnowledge,
        CV: data.CV,
        teamName: teamData.teamName
    }

    return({
        isValid: true,
        message: "User added to team successfully",
        data: userData
    })
};

module.exports = { userRegistration, deleteUser, updateUser, addToTeam, getOneUser };