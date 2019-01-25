var mongoose                = require('mongoose'),
    passwordLocalMoongose   = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passwordLocalMoongose);

module.exports = mongoose.model("User", UserSchema);