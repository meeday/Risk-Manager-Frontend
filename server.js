const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

// db connect to different schema
const db = require("./db/index");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3", {
    useNewUrlParser: true,
    useFindAndModify: false
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
