const express = require("express");
const app = express();
const cors = require("cors");
const indexRoutes = require("./routes/index");
const { connectiondb } = require("./db/connectiondb");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/", indexRoutes);
app.get("/", (req, res) => {
    res.send("Server is running");
});
app.use("/uploads", express.static("./uploads"));
connectiondb();
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});