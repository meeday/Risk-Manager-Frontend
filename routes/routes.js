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

// Get user info
// CAUTION!!! Security issue (will send back password as well)
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

// Change User Data
function changeUserData(body) {
    // Pass in parameter require userid
    const userid = body.userid;
    db.User.update({_id: userid}, {$set: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password,
        designDiscipline: body.designDiscipline,
        authorisation: body.authorisation,
        project: body.project
    }})
        .then(console.log("-------update success-------"))
        .catch(err => {
            console.log("---Update failed---");
            console.log(err);
        })
}

/*const testingPack = {
    email: "testing@yahoo.com",
    firstName: "testing",
    lastName: "123",
    password: "testing"
}*/

//const testingPack = "5f3790e7f9d4d567d4c08764";

const testingPack = {
    userid: "5f3790e7f9d4d567d4c08764",
    email: "123@email.com",
    firstName: "iam",
    lastName: "ironman",
    password: "password",
    designDiscipline: null,
    authorisation: null,
    project: null
}

const num = "5f3790e7f9d4d567d4c08764";

getUserData(num);
//addUserData(testingPack);
