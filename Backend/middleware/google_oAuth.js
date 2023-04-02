const OAuth2Strategy = require('passport-google-oauth20')
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');
const { userModel } = require('../model/user.model');

passport.use(new OAuth2Strategy({
    clientID: '739712783819-9958ithson5n6kl2gsl3fuogoik6t69r.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8000/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        const user = new userModel({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: uuidv4() //use uuid for validating the password uuidv4()
        })
        await user.save()
        console.log(profile);
        return cb(null, user);
    }

));

module.exports = { passport }