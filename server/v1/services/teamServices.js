const teamDB = require("./database/teamDB");
const accountDB = require("./database/accountDB");

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

module.exports = { createTeam, updateTeam };