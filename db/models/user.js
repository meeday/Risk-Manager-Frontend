const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a validate email"]
    },
    firstName: {
        type: String,
        trim: true,
        required: "First Name is Required"
    },
    lastName: {
        type: String,
        trim: true,
        required: "Last Name is Required"
    },
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [({ length }) => length >= 6, "Password should be longer."]
    },
    designDiscipline: {
        type: Schema.Types.ObjectId,
        ref: "Disciplines"
    },
    authorisation: {
        type: Schema.Types.ObjectId,
        ref: "Authorisation"
    },
    project: [{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

//testing platform
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3", {
    useNewUrlParser: true,
    useFindAndModify: false
});