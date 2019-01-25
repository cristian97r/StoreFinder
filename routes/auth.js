var express       = require("express"),
    router        = express.Router(),
    passport      = require("passport"),
    User          = require("../models/user");


router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', function(req, res) {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(error, user) {
        if(error){
            console.log(error)
            return res.render('register')
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/stores');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login')
})

router.post('/login', passport.authenticate("local", {
    successRedirect: '/stores',
    failureRedirect: "/login",
}),function(req, res) {
})

router.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('/')
})

// MIDDLEWARE
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
}

module.exports = router;
