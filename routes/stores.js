var express = require("express"),
    router  = express.Router(),
    Store   = require("../models/stores");

router.get("/stores", function(req, res){
    // GET STORES FROM DB
    Store.find({}, function(error, allStores) {
        if(error){
            console.log(error)
        }else{
            res.render("index",{stores:allStores});
        }
    });  
});


router.get("/stores/new", function(req, res) {
    res.render("new")
});


router.post("/stores", function(req, res){
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

router.get("/stores/:id", function(req, res) {
    Store.findById(req.params.id).populate("comments").exec(function(error, foundStore) {
        if(error){
            Console.log(error)
        } else {
            res.render("show", {store: foundStore});
        }
    });

});

// MIDDLEWARE
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
}

module.exports = router;