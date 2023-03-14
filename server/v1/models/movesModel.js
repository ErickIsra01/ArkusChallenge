const mongoose = require("mongoose");

const { Schema } = mongoose;

const movesSchema = new mongoose.Schema({
    idMove: { type: Schema.Types.ObjectId },
    idTeam: { type: mongoose.Types.ObjectId, ref: "teams" },
    startingDate: { type: Date },
    finishingDate: { type: Date },
    idResponsable: { type: mongoose.Types.ObjectId, ref: "users" }
});

module.exports = mongoose.model('moves', movesSchema);