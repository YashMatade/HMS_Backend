const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    companyName: {
        type: String
    },
    image: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    experience: {
        type: String
    },
    status: {
        type: String
    }
});

module.exports = mongoose.model("Job", jobSchema);
