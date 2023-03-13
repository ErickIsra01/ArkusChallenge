const teamDB = require("./database/teamDB");
const accountDB = require("./database/accountDB");

async function createTeam(data) {
    const createdTeam = await teamDB.createTeam(data);
    const accountTeam = await accountDB.updateAccount({_id: data.account}, { $push: { team: createdTeam._id } });

    if(data.account === undefined) return({
        isValid: true,
        message: "Team created successfully",
        data: {
            createdTeam,
            accountTeam
        }
    });
    
    if(data.account && !accountTeam) return({
        isValid: true,
        message: "Team created successfully but couldn't be added to an account because it doesn't exist",
        data: {
            createdTeam,
            accountTeam
        }
    });

    return ({
        isValid: true,
        message: "Team created successfully and added to an account",
        data: {
            createdTeam,
            accountTeam
        }
    });
};

module.exports = { createTeam };