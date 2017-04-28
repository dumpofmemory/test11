var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose); //this basically takes the wheel and starts adding some methods to our user

module.exports = mongoose.model("User", UserSchema);