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
            req.flash("error", error.message)
            return res.redirect('register')
        }
        passport.authenticate('local')(req, res, function(){
            req.flash("success", "Welcome to StoreFinder " + user.username);
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
    req.flash("success", "You have logout!")
    res.redirect('/')
})


module.exports = router;
