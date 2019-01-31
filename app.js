// DEPENDENCIES
var express    = require('express'),
app            = express(),
bodyParser     = require('body-parser'),
mongoose       = require("mongoose"),
flash          = require('connect-flash'),
passport       = require("passport"),
LocalStrategy  = require("passport-local"),
methodOverride = require('method-override'),
Store          = require("./models/stores"),
User           = require("./models/user"),
Comment        = require("./models/comment");

// ROUTES DEPENDENCIES
var storeRoutes    = require('./routes/stores'),
    commentRoutes  = require('./routes/comments'),
    authRoutes     = require('./routes/auth')


// APP CONFIG
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); 
app.use(methodOverride("_method"));
app.use(flash());


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

// USE VARIABLE IN ALL ROUTES
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error")
    res.locals.success     = req.flash("success")
    next();
});

// INDEX ROUTE
app.get("/", function(req, res) {
    res.render("landing");  
});

// ROUTES CONFIG
app.use(storeRoutes);
app.use(commentRoutes);
app.use(authRoutes);


// START SERVER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("StoreFinder in running")
});