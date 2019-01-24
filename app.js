var express = require('express'),
app         = express(),
bodyParser  = require('body-parser'),
mongoose    = require("mongoose"),
Store       = require("./models/stores"),
Comment     = require("./models/comment")

mongoose.connect("mongodb://localhost/StoreFinder", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

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


app.post("/stores/:id/comments", function(req, res) {
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



app.listen(3000, function(){
    console.log("StoreFinder in running on port 3000")
});