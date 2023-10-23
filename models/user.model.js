const mongoose = require("mongoose");
const jobModel = require("./job.model");
const Schema = mongoose.Schema;

const user = new Schema({
    firstName: {
        type: String
    },
    email: {
        type: String
    },
    lastName: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    role: {
        type: String,
        enum: ["employee", "employer"]
    },
    education: {
        type: String
    },
    password: {
        type: String
    }
});
module.exports = mongoose.model("user", user);