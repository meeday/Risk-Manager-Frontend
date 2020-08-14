const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt');
const User = require('../db/models/user');

// this is authorization.
// once we  areauthenticated we setting up a cookie user's browser, this cookie will be our jwt-Token
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtrator,
    //this key will verify is this token is legilimen
    secretOrKey: 'riskManager'
},(payload, done) => {
    User.findById({_id: payload.sub}, (err, user) => {
        // if there is any error
        if(err)
        return done(err, false);
        // this user is already authenticated, we dont have to check the password again
        if(user)
        // if user exist no err return user
        return done(null, user);
        else
        // there is no user has that primary key
        return done(null, false)
    })
}))

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