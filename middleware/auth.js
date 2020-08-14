const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt');
const User = require('../db/models/user');



//  authenticated local strategy using username and passwod
passport.use(new localStrategy((username, password, done) =>{
    User.findOne({username}, (err, user) => {
        // something went wrong with database
        if(err)
        return done(err);
        // if no user exist
        if(!user)
        return done(null, false);
        //if password if correct
        user.comparePassword(password, done);

    });
}));