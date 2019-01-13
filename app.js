var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");  
});

var stores =  [
    {name: 'CoffeShop', image:'https://pixabay.com/get/e136b30e20fc1c22d2524518b7444795ea76e5d004b0144592f3c271a2e9b3_340.jpg'},
    {name: 'Bakery', image:'https://pixabay.com/get/e136b30e20fc1c22d2524518b7444795ea76e5d004b0144592f3c271a2e9b3_340.jpg'},
    {name: 'Bakery', image:'https://pixabay.com/get/e136b30e20fc1c22d2524518b7444795ea76e5d004b0144592f3c271a2e9b3_340.jpg'},
    {name: 'Bakery', image:'https://pixabay.com/get/e136b30e20fc1c22d2524518b7444795ea76e5d004b0144592f3c271a2e9b3_340.jpg'},
    {name: 'Bakery', image:'https://pixabay.com/get/e136b30e20fc1c22d2524518b7444795ea76e5d004b0144592f3c271a2e9b3_340.jpg'},
    {name: 'Cowboy Bar', image:'https://pixabay.com/get/e136b30e20fc1c22d2524518b7444795ea76e5d004b0144592f3c271a2e9b3_340.jpg'}
]

app.get("/stores", function(req, res){
   res.render("stores",{stores:stores});
});

app.post("/stores", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newStore = {name: name, image: image};
    stores.push(newStore);

    res.redirect("/stores");
});

app.get("/stores/new", function(req, res) {
    res.render("new")
});

app.listen(3000, function(){
    console.log("StoreFinder in running on port 3000")
});