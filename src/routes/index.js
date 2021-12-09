const router = require('express').Router();
const passport = require('passport');
const UserSchema = require('../models/Usuario');

router.get('/', (req, res, next) => {
    res.render('index');
});
router.get('/registro', (req, res, next) => {
    res.render('registro');
});


router.post('/registro', passport.authenticate('local-registro' ,{
    successRedirect: '/login',
    failureRedirect: '/registro',
    failureFlash: true
})); 

router.post('/registro', async (req, res, next) => { 
    const userSchema = UserSchema(req.body)
    const userSchemaSaved = await userSchema.save()    
});

router.get('/login', (req, res, next) => {
    res.render('login');
  });
  
  
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/servicio',
    failureRedirect: '/login',
    failureFlash: true
    }));

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
    });

//para muchas rutas debo usar:
/*router.use((req, res, next) => {
    isAuthenticated(req,res, next);
    next();
});*/

router.get('/servicio',isAuthenticated, (req, res, next) => {
res.render('servicio');
});    
    
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    
    res.redirect('/login')
}
    
module.exports = router;
