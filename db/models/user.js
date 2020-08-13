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
// use this function to hash the password before saving to database
// this is mongoose midleware, once saved it will go to next
// use old function wants to access to "this"
UserSchema.pre('save',function(next){
    // if password already modified
    if(!this.isModified('password'))
    return next();
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if(err)
        return next(err);
        this.password = passwordHash;
        next();
    });
});




const User = mongoose.model("User", UserSchema);

module.exports = User;