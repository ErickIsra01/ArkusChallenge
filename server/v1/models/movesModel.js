const mongoose = require("mongoose");

const { Schema } = mongoose;

const movesSchema = new mongoose.Schema({
    idMoves: { type: Schema.Types.ObjectId },
    date: { type: Date },
    from: { type: String },
    to: { type: String },
    member: { type: mongoose.Types.ObjectId, ref: "users" },
    responsable: { type: mongoose.Types.ObjectId, ref: "users" }
});

module.exports = mongoose.model('moves', movesSchema);