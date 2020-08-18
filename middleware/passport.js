const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../db/models/user');
require('dotenv').config();

// this is a custom function we use for to extract the jwt-token from the request
const cookieExtrator = req => {
    let token = null;
    if(req && req.cookies){
     token = req.cookies['access_token'];
    }
    return token;
}

// this is authorization.
// once we  areauthenticated we setting up a cookie user's browser, this cookie will be our jwt-Token
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtrator,
    //this key will verify is this token is legilimen
    secretOrKey: process.env.SECRET_OR_KEY
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

//  authenticated local strategy using email and passwod
passport.use(new localStrategy((email, password, done) =>{
    console.log(email);
    User.findOne({email}, (err, user) => {
        // something went wrong with database
        if(err)
        return done(err + "user didn't found");
        // if no user exist
        if(!user)
        return done(null, false);
        //if password if correct
        user.comparePassword(password, done);

    });
}));