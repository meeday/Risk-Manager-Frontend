const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt');
const User = require('../db/models/user');
