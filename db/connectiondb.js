const mongoose = require("mongoose");

exports.connectiondb = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to database");
    }).catch((error) => {
        console.log("Error occured", error);
    })
}