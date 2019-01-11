var express = require('express');
var app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing")
});

app.get("/stores", function(req, res) {
   var stores =  [
       {name: 'CoffeShop', image:'https://pixabay.com/get/e136b30e20fc1c22d2524518b7444795ea76e5d004b0144592f2c07aa1eab5_340.jpg'},
       {name: 'Bakery', image:'https://pixabay.com/get/e835b50e2ef2003ed1584d05fb1d4e97e07ee3d21cac104491f7c378a4ebb2b8_340.jpg'},
       {name: 'Cowboy Bar', image:'https://pixabay.com/get/ea3db4082bf0063ed1584d05fb1d4e97e07ee3d21cac104491f7c378a4ebb2b8_340.jpg'}
   ]

   res.render("stores");
});

app.listen(3000, function(){
    console.log("StoreFinder in running on port 3000")
});