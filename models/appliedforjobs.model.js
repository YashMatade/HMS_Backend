const mongoose = require("mongoose");
const userModel = require("./user.model");
const jobModel = require("./job.model");
const Schema = mongoose.Schema;
const appliedjob = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: jobModel
    }
});

module.exports = mongoose.model("appliedjobs", appliedjob);