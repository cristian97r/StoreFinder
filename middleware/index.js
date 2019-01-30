var Store   = require("../models/stores"),
    Comment = require("../models/comment")

const middleware = {}

middleware.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
}

middleware.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(error, foundComment) {
            if(error){
                res.redirect('back');
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    return next();
                } else {
                    res.redirect("back");                }
            }
        });
    } else {
        res.redirect("back");
    }
}

middleware.checkStoreOwnership = function(req, res, next) {
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

module.exports = middleware