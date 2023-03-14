const mongoose = require("mongoose");

const { Schema } = mongoose;

const accountSchema = mongoose.Schema({
    idAccount: { type: Schema.Types.ObjectId },
    accountName: { type: String },
    clientName: { type: String },
    responsableName: { type: String }
})

module.exports = mongoose.model("accounts", accountSchema);