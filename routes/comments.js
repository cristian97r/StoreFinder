var express = require("express"),
    router  = express.Router(),
    Store   = require("../models/stores"),
    Comment = require("../models/comment");

router.post("/stores/:id/comments", isLoggedIn ,function(req, res) {
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

// MIDDLEWARE
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
}

module.exports = router;
