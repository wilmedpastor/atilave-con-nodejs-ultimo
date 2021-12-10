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
    if(user) {
        return done(null, false, req.flash('signupMessage', 'El Email ya está en uso, crea uno nuevo o haz login:'));        
    } else{
        const newUser = new User(); 
        newUser.tip_documento= User.tip_documento;
        newUser.num_documento=User.num_documento;
        newUser.nombres=User.nombres;
        newUser.apellidos=User.apellidos;
        newUser.celular=User.celular;
        newUser.direccion=User.direccion;
        newUser.ciudad=User.ciudad;                        
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);        
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