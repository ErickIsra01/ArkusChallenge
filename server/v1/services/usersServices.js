const usersDB = require("./database/usersDB");
const teamDB = require("../services/database/teamDB");
const usersDTO = require("../controllers/DTOs/usersDTO");

async function userRegistration(data) {
    const createdUser = await usersDB.addUser(data);
    const teamUser = await teamDB.updateTeam({_id: data.team}, { $push: { members: createdUser._id } });

    if(data.team === undefined) return({
        isValid: true,
        message: "User created successfully",
        data: {
            createdUser,
            teamUser
        }
    });
    
    if(data.team && !teamUser) return({
        isValid: true,
        message: "User created successfully but couldn't be added to a team that doesn't exist",
        data: {
            createdUser,
            teamUser
        }
    });

    return ({
        isValid: true,
        message: "User created successfully and added to a team",
        data: {
            createdUser,
            teamUser
        }
    });
};

async function updateUser(userData, oldTeam) {
    const updatedUser = await usersDB.updateUser(userData.idUser, userData.data);
    console.log(userData.data.team, oldTeam);
    await teamDB.updateTeam({ _id: oldTeam }, { $pop: { members: updatedUser._id } });
    const newTeamUser = await teamDB.updateTeam({_id: userData.data.team}, { $push: { members: createdUser._id } });

    const data = usersDTO(updatedUser, newTeamUser);

    return({
        isValid: true,
        message: "User updated successfully",
        data
    })
};

module.exports = { userRegistration, updateUser };