var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/StoreFinder", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");  
});

// SCHEMA & MODEL

var storesSchema = new mongoose.Schema({
    name:        String,
    image:       String,
    description: String
});

var Store = mongoose.model("Store", storesSchema);

// Store.create({
//     name: 'Exterior, Kmart White Lake', image:'https://farm4.staticflickr.com/3430/3800151320_e73669661f.jpg',
//     description: "Spicy jalapeno jerky bresaola tenderloin tongue chicken leberkas. Frankfurter leberkas jerky pork short ribs tongue pork chop t-bone. Filet mignon frankfurter andouille swine turkey strip steak jerky pork leberkas hamburger boudin shoulder shankle spare ribs ground round. Jowl landjaeger pastrami frankfurter meatloaf boudin. Kielbasa shank filet mignon swine beef ribs tail cow corned beef short loin frankfurter spare ribs landjaeger."
// }, function(error, store){
//     if(error){
//         console.log(error)
//     }else {
//         console.log("New Store created:")
//         console.log(store)
//     }
// });

// END

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
    var newStore = {name: name, image: image};
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
    res.render("show");
});



app.listen(3000, function(){
    console.log("StoreFinder in running on port 3000")
});