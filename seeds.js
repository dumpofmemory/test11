var mongoose = require("mongoose");
var Book = require("./models/book");
var Comment = require("./models/comment");

var data = [
        {
            name: "The Master Algorithm: How the Quest for the Ultimate Learning Machine Will Remake Our World",
            image: "https://images-na.ssl-images-amazon.com/images/I/519HYQKubEL._SX328_BO1,204,203,200_.jpg",
            desc: "no description yet"
        },
        {
            name: "Eloquent JavaScript: A Modern Introduction to Programming",
            image: "https://images-na.ssl-images-amazon.com/images/I/511ZDqFj28L._SX376_BO1,204,203,200_.jpg",
            desc: "A concise and balanced mix of principles and pragmatics. I loved the tutorial-style game-like program development. This book rekindled my earliest joys of programming. Plus, JavaScript!"
        },
        {
            name: "Java How To Program (Early Objects) (10th Edition) by Deitel, Paul, Deitel, Harvey (2014)",
            image: "https://images-na.ssl-images-amazon.com/images/I/51t453ETh-L._SX383_BO1,204,203,200_.jpg",
            desc: "no description yet"
        },
        {
            name: "Thinking in JAVA, Bruce Eckel, 4th edition",
            image: "https://images-na.ssl-images-amazon.com/images/I/516lgk37ooL._SX379_BO1,204,203,200_.jpg",
            desc: ""
        },
        {
            name: "Don't Be Sad",
            image: "https://images-na.ssl-images-amazon.com/images/I/41n%2BooDy7YL._SX258_BO1,204,203,200_.jpg",
            desc: "Don't be sad: Remember that you believe in Allah. Pause to .... Don t be Sad is an important book for all."
        },
        {
            name: "In the Miso Soup",
            image: "https://images-na.ssl-images-amazon.com/images/I/51CWRDKG2CL.jpg",
            desc: "In the Miso Soup is a novel by Ryu Murakami. It was published in 1997 in Japanese, and in English in 2003. The novel won the Yomiuri Prize for Fiction in 1997."
        }
    ];


function seedDB(){
    //remove all the books from the booksdb
    Book.remove({}, function(err){
        if(err) {
            console.log(err);
        }
        console.log("removed books!");
        // add a few books
        data.forEach(function(seed){
            Book.create(seed, function(err, book){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a book!");
                    //add a few comments
                    Comment.create(
                        {
                            text: "Great book! Need more!",
                            author: "Bob Belcher"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                book.comments.push(comment);
                                book.save();
                                console.log("Created new coment");
                            }
                            
                        });
                }
            }); 
        });
    });
}

module.exports = seedDB;