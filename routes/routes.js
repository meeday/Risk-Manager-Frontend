const router = require("express").Router();
const db = require("../db/index");

//------------- USER -------------

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

// Get single user info
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
// CAUTION NEED TO DISCUSS WHAT NEED TO CHANGE AND WHAT CANT
function changeUserData(body) {
    // pass in parameter should be userid
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

// ------------- USER END -------------



// -------------TESTING PLATFORM-------------

/*const testingPack = {
    email: "testing@yahoo.com",
    firstName: "testing",
    lastName: "123",
    password: "testing"
}*/

//const testingPack = "5f3790e7f9d4d567d4c08764";

const testingPack = {
    userid: "5f3790e7f9d4d567d4c08764",
    email: "beta@email.com",
    firstName: "iam",
    lastName: "ironman",
    designDiscipline: null,
    authorisation: null,
    project: null
}

const num = "5f3790e7f9d4d567d4c08764";

//changeUserData(testingPack);
getUserData(num);

// -------------TESTING PLATFORM END-------------