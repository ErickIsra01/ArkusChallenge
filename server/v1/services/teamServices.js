const teamDB = require("./database/teamDB");
const usersDB = require("./database/usersDB");
const mongoose = require("mongoose").Types.ObjectId;

async function createTeam(data) {
    const createdTeam = await teamDB.createTeam(data);

    return ({
        isValid: true,
        message: "Team created successfully",
        data: createdTeam
    });
};

async function updateTeam(data) {
    const createdTeam = await teamDB.updateTeam({_id: data.idTeam}, data.data);

    return ({
        isValid: true,
        message: "Team updated successfully",
        data: createdTeam
    });
};

async function deleteTeam(data) {
    const deletedTeam = await teamDB.deleteTeam({_id: data.idTeam});

    return ({
        isValid: true,
        message: "Team deleted successfully",
        data: deletedTeam
    });
};

async function addToAccount(data, teamData, accountData) {
    await teamDB.updateTeam({ _id: data.idTeam }, data.data);

    return ({
        isValid: true,
        message: "Team added to account successfully",
        data: {
            teamName: teamData.teamName,
            accountData
        }
    });
};

async function getOneTeam(data) {
    const team = await teamDB.findById(data.idTeam);
    
    const users = await usersDB.find({ idTeam: team._id });

    
    const result = {
        teamName: team.teamName,
        users
    };

    return ({
        isValid: true,
        message: "Team retrieved successfully",
        data: result
    });
};

async function getAllTeams() {
    const teams = await teamDB.find({}, { __v: 0 });

    return ({
        isValid: true,
        message: "Teams retrieved successfully",
        data: teams
    });
};



module.exports = { createTeam, updateTeam, deleteTeam, addToAccount, getOneTeam, getAllTeams };