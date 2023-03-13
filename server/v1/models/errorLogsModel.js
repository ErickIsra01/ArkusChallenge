const mongoose = require("mongoose");

const { Schema } = mongoose;

const errorLogsSchema = mongoose.Schema({
    idLog: { type: Schema.Types.ObjectId },
    type: { type: String },
    message: { type: String }
})

module.exports = mongoose.model('errors', errorLogsSchema);