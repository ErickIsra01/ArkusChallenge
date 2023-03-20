const teamModel = require("../../models/teamsModels");

async function createTeam(data) {
    const team = new teamModel(data);
    const createdTeam = team.save();
    return createdTeam;
}

async function deleteTeam(id) {
    const deletedTeam = await teamModel.findOneAndDelete(id);
    return deletedTeam;
};

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

async function find(data, parameters) {
    const teams = await teamModel.find(data, parameters);
    return teams;
}

async function findAll() {
    const teams = await teamModel.aggregate([
        { $lookup: {
            from: 'accounts',
            localField: 'idAccount',
            foreignField: '_id',
            as: 'accountData'
        } },
        {
            $unwind: { path: "$accountData", preserveNullAndEmptyArrays: true }
        },
        {
            $project: { "__v": 0 }
        }
    ]
    );
    return teams;
}

module.exports = { findByName, createTeam, updateTeam, findById, deleteTeam, find, findAll };