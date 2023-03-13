const mongoose = require("mongoose");

const { Schema } = mongoose;

const teamsSchema = mongoose.Schema({
    idTeam: { type: Schema.Types.ObjectId },
    teamName: { type: String },
    teamLeader: { type: Schema.Types.ObjectId },
    members: [{ type: Schema.Types.ObjectId, ref: "users" }]
});

module.exports = mongoose.model('teams', teamsSchema);