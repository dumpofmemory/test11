var mongoose = require("mongoose");

//SCHEMA SETUP
var bookSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
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

//compile the Schema into a model
//the name Book is pluralized, you can see through 'show collections'

module.exports = mongoose.model("Book", bookSchema);