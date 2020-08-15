const router = require("express").Router();
const db = require("../db/index");

// Add User
function addUser(body) {
    console.log("function run");
    console.log(body);
    db.User.create(body)
        .then(dbUser => {
            console.log("success \n");
            console.log(dbUser);
            return dbUser;
        })
        .catch(err => {
            console.log("failed");
            return err;
        });
}

function getUserData(userid) {
    db.User.find({ _id: userid })
        .then(userData => {
            console.log("\n Success \n -------DATA BELOW-------")
            console.log(userData);
            return userData;
        })
        .catch(err => {
            console.log("failed");
            return err;
        });
};


/*const testingPack = {
    email: "testing@yahoo.com",
    firstName: "testing",
    lastName: "123",
    password: "testing"
}*/

const testingPack = "5f3790e7f9d4d567d4c08764";


getUserData(testingPack);
