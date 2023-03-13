const mongoose = require("mongoose");

const { Schema } = mongoose;

const tokensSchema = mongoose.Schema({
    idToken: { type: Schema.Types.ObjectId },
    userID: { type: Schema.Types.ObjectId, ref: "users" },
    token: { type: String }
});

module.exports = mongoose.model("tokens", tokensSchema);
