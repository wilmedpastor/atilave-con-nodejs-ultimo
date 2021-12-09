const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/Usuario');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-registro', new LocalStrategy({ 
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({email: email});
    console.log(user)
    if(user) {
        return done(null, false, req.flash('signupMessage', 'El Email ya está en uso, crea uno nuevo o haz login:'));        
    } else{
        const newUser = new User();         
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        console.log(new User)
        await newUser.save();        
        done(null, newUser);         
    }      
}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    const user = await User.findOne({email: email});
    if(!user) {
      return done(null, false, req.flash('signinMessage', 'Email no encontrado'));
    }
    if(!user.comparePassword(password)) {
      return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta'));
    }
    return done(null, user);
  }));