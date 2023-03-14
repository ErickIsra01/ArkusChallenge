const mongoose = require("mongoose");

const { Schema } = mongoose;

const teamsSchema = mongoose.Schema({
    idTeam: { type: Schema.Types.ObjectId },
    teamName: { type: String },
    account: { type: Schema.Types.ObjectId, ref: 'accounts'}
});

module.exports = mongoose.model('teams', teamsSchema);