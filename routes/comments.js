var express    = require("express"),
    router     = express.Router(),
    Store      = require("../models/stores"),
    Comment    = require("../models/comment"),
    middleware = require("../middleware")

router.post("/stores/:id/comments", middleware.isLoggedIn ,function(req, res) {
    Store.findById(req.params.id, function(error, store) {
        if(error){
            console.log(error);
            res.redirect("/stores");
        } else {
            Comment.create(req.body.comment, function(error, comment){
                if(error){
                    console.log(error);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    store.comments.push(comment);
                    store.save();
                    res.redirect("/stores/" + store._id);
                }
            });
        }
    });
});

router.get("/stores/:id/comments/:comment_id/edit", middleware.checkCommentOwnership ,function(req, res) {
    Comment.findById(req.params.comment_id, function(error, foundComment) {
        if(error){
            res.redirect("back");
        } else {
            res.render("editComment", {store_id: req.params.id, comment: foundComment});
        }
    });
});

router.put("/stores/:id/comments/:comment_id", middleware.checkCommentOwnership ,function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(error, updatedComment){
        if(error){
            console.log(error);
        } else {
            res.redirect("/stores/" + req.params.id);
        }
    });
});

router.delete("/stores/:id/comments/:comment_id", middleware.checkCommentOwnership ,function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(error) {
        if(error){
            console.log(error);
        } else {
            req.flash("success", "Comment deleted")
            res.redirect("/stores/" + req.params.id);
        }
    });
});

module.exports = router;
