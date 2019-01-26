var mongoose = require("mongoose");

// SCHEMA & MODEL

var storesSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

var Store = mongoose.model("Store", storesSchema);
module.exports = Store;
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
