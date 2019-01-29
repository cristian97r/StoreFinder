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


router.get("/stores/new", isLoggedIn ,function(req, res) {
    res.render("new");
});


router.post("/stores", isLoggedIn ,function(req, res){
    // data from the form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newStore = {name: name, image: image, description: desc, author: author};
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

router.get("/stores/:id/edit", checkStoreOwnership ,function (req, res) {
    Store.findById(req.params.id, function (error, foundStore) {
        if (error) {
            console.log(error);
        } else {
            res.render("edit", {store: foundStore});
        }
    });
});

router.put("/stores/:id", checkStoreOwnership ,function(req, res) {
    Store.findOneAndUpdate(req.params.id, req.body.store, function(error, updatedStore) {
        if(error){
            console.log(error)
        } else {
            res.redirect("/stores/" + req.params.id);
        }
    });
});

router.delete("/stores/:id", checkStoreOwnership ,function(req, res) {
    Store.findOneAndRemove(req.params.id, function(error) {
        if(error){
            console.log(error);
        } else {
            res.redirect("/stores");
        }
    });
});

// MIDDLEWARE
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
}

function checkStoreOwnership(req, res, next) {
    if(req.isAuthenticated()){
        Store.findById(req.params.id, function(error, foundStore) {
            if(error){
                res.redirect('back');
            } else {
                if(foundStore.author.id.equals(req.user._id)){
                    return next();
                } else {
                    res.redirect("back");                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;