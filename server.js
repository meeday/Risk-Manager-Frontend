const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const User = require('./middleware/auth')
const app = express();

const PORT = process.env.PORT || 8080;

// db connect to different schema
const db = require("./db/index");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/engineerdb", {
    useNewUrlParser: true,
    useFindAndModify: false
});

const userInput = {
    username: 'niro',
    password: '12345',
    role: 'admin'
}

const user= new db.User(userInput);
user.save((err, document) => {
    if(err)
    console.log(err);
    console.log(document);
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
