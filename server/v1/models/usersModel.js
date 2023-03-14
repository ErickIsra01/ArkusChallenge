const { text } = require("express");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    idUser: { type: Schema.Types.ObjectId },
    name: { type: String },
    email: { type: String },
    range: { type: String },
    password: { type: String },
    englishLevel: { type: String },
    techKnowledge: { type: String },
    CV: { type: String },
    idTeam: { type: Schema.Types.ObjectId, ref: 'teams' },
    idMove: { type: Schema.Types.ObjectId, ref: 'moves' }
})

module.exports = mongoose.model('users', userSchema);
