var Store   = require("../models/stores"),
    Comment = require("../models/comment")

const middleware = {}

middleware.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login")
    res.redirect("back");
}

middleware.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(error, foundComment) {
            if(error || !foundComment){
                req.flash("error", "Comment not found")
                res.redirect('back');
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    return next();
                } else {
                    req.flash("error", "You don't have permission")
                    res.redirect("back");                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in")
        res.redirect("back");
    }
}

middleware.checkStoreOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Store.findById(req.params.id, function(error, foundStore) {
            if(error || !foundStore){
                req.flash("error", "Store not found")
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

module.exports = middleware