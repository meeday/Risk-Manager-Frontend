const db = require("../../db/index");

function createAuth(body) {
    console.log("Creating Auth...");
    console.log(body);
    db.Authorisation.create(body)
        .then(dbAuth => {
            console.log("\nSuccessfully created new auth class\n");
            console.log(dbAuth);
            return dbAuth;
        })
        .catch(err => {
            console.log("\nFailed to create new auth class\n");
            return err;
        });
};

function deleteAuth(classname) {
    console.log("Deleting Auth Class...");
    db.Authorisation.remove({ authorisationStatus: classname })
        .then(console.log("Successfully Deleted"))
        .catch(err => {
            console.log(err);
            return err;
        });
};

module.exports = [createAuth, deleteAuth];