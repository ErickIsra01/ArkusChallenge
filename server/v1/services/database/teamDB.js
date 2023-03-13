const teamModel = require("../../models/teamsModels");

async function createTeam(data) {
    const team = new teamModel(data);
    const createdTeam = team.save();
    return createdTeam;
}

async function findByName(name) {
    const team = await teamModel.findOne({ teamName: name});
    return team;
};

async function findById(id) {
    const team = await teamModel.findById(id);
    return team;
}

async function updateTeam(id, data) {
    const updatedTeam = await teamModel.findOneAndUpdate(id, data);
    return updatedTeam;
}

module.exports = { findByName, createTeam, updateTeam, findById };