var express = require('express'),
app         = express(),
bodyParser  = require('body-parser'),
mongoose    = require("mongoose"),
passport    = require("passport"),
LocalStrategy = require("passport-local"),
Store       = require("./models/stores"),
User        = require("./models/user"),
Comment     = require("./models/comment");

// APP CONFIG
mongoose.connect("mongodb://localhost/StoreFinder", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); 


// PASSPORT CONFIG
app.use(require('express-session')({
    secret: "27184444808668204120726121",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// ROUTES
app.get("/", function(req, res) {
    res.render("landing");  
});

app.get("/stores", function(req, res){
    // GET STORES FROM DB
    Store.find({}, function(error, allStores) {
        if(error){
            console.log(error)
        }else{
            res.render("index",{stores:allStores});
        }
    });  
});


app.get("/stores/new", function(req, res) {
    res.render("new")
});


app.post("/stores", function(req, res){
    // data from the form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newStore = {name: name, image: image, description: desc};
    // add to the database
    Store.create(newStore, function(error, newStore) {
        if(error){
            console.log(error)
        }else{
            res.redirect("/stores");
        }
    });
});

app.get("/stores/:id", function(req, res) {
    Store.findById(req.params.id).populate("comments").exec(function(error, foundStore) {
        if(error){
            Console.log(error)
        } else {
            res.render("show", {store: foundStore});
        }
    });

});


app.post("/stores/:id/comments", isLoggedIn ,function(req, res) {
    Store.findById(req.params.id, function(error, store) {
        if(error){
            console.log(error);
            res.redirect("/stores");
        } else {
            Comment.create(req.body.comment, function(error, comment){
                if(error){
                    console.log(error);
                } else {
                    store.comments.push(comment);
                    store.save();
                    res.redirect("/stores/" + store._id);
                }
            });
        }
    });
});


app.get('/register', function(req, res) {
    res.render('register');
});

app.post('/register', function(req, res) {
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

app.get('/login', function(req, res) {
    res.render('login')
})

app.post('/login', passport.authenticate("local", {
    successRedirect: '/stores',
    failureRedirect: "/login",
}),function(req, res) {
})

app.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('/')
})

// MIDDLEWARE
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
}

// START SERVER
app.listen(3000, function(){
    console.log("StoreFinder in running on port 3000")
});