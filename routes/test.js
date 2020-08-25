const routes = require("./routes");

const auth = {
    AuthorisationStatus: "Admin"
};

const discipline = {
    validate: "LOL"
};

const project = {
    title: "Engineer"
};

const risk = {
    title: "testing",
    description: "betaTest",
    location: [123,144],
    comments: "no comment",
    likelihood: 2,
    severity: 2,
    risk: 4
}

const status = {
    status: "bad"
}

const user = {
    email: "hi@yahoo.com.hk",
    firstName: "hihi",
    lastName: "ihihi",
    password: "12315252513"
}

routes.createAuth(auth);
console.log("\n")
routes.createDiscipline(discipline);
console.log("\n")
routes.createProject(project);
console.log("\n")
routes.createRisk(risk);
console.log("\n")
routes.createStatus(status);
console.log("\n")
routes.createUser(user);