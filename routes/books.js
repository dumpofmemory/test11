var express = require("express");
var router = express.Router();
var Book = require("../models/book");
// var User = require("../models/user");
// var Comment = require("../models/comment");



//INDEX route - show all books
router.get("/", function(req, res){
    //req.user has all the info about the currently logged in user 
    //Get all books from DB
    Book.find({}, function(err, books){
       if(err){
           console.log(err);
       } else {
           res.render("books/books", {books: books});
       }
    });
    
});


//CREATE route - add new book to the db
router.post("/", isLoggedIn, function(req, res){
    //res.send("YOU HIT THE POST ROUTE!");
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    //console.log(req.user);
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    //create an object that will be pushed into the array of campgrounds data
    var newBook = {name: name, image: image, desc: desc, author: author};
    //Create a new campground and save it to DB
    Book.create(newBook, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to books page
            res.redirect("/books");
        }
    });
    
}); 


//NEW route - show form to add a new book
router.get("/new", isLoggedIn, function(req, res) {
    res.render("books/new");
});

//SHOW route - shows more info about chosen book
//when having ../:somerouteparamvariable it is stored
//inside req(uest).params
router.get("/:id", function(req, res) {
    //find the book with provided id
    //var id = req.params.id;
    //use mongoose method findById(id, callback)
    Book.findById(req.params.id).populate("comments").exec(function(err, foundBook){ //populate comments array with the actual comments
        //foundBook is the data that is coming back from .findById()
        if(err){
            console.log(err);
        } else {
            //console.log(foundBook); //to see how the array of comments has been populated with the actual comments
            //render show template with that book
            //under the name of book in the show.ejs we can access foundBook 
            res.render("books/show", {book: foundBook});
        }
    });
  
});


//===========EDIT Book ROute
router.get("/:id/edit", checkBookOwner, function(req, res) {
    // is user logged in?
    // if(req.isAuthenticated()){
        Book.findById(req.params.id, function(err, foundBook){
        // if(err) {
        //     console.log(err);
        // } else {
            // does user own the book?
            // console.log(foundBook.author.id); //is a Mongoose Object
            // console.log(req.user._id);  //is a string
            // if(foundBook.author.id.equals(req.user._id)){
                res.render("books/edit", {book: foundBook});
            // } else {
            //     res.send("You do not have permission to do that");
            // }
                    
        // }
    });
    // } 
    // else {
    //     console.log("Log in first");
    //     res.send("log in first!");
    // }
    
    // otherwise redirect
    // if not, redirect
   
    
});


//==============UPDATE route
router.put("/:id", checkBookOwner, function(req, res){
    //find and update the correct book
    Book.findByIdAndUpdate(req.params.id, req.body.book, function(err, updatedBook){
        if(err) {
            res.redirect("/books");
        } else{
            //res.redirect("/books/" + req.params.id);
            //because no ajax yet, redirect to main books page 
            res.redirect("/books");
        }
    });
});


//=====================DESTROY ROUTE
router.delete("/:id", checkBookOwner, function(req, res){
    Book.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/books");
        } else {
            res.redirect("/books");
        }
    });
});





//MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

function checkBookOwner(req, res, next){
    if(req.isAuthenticated()) {
        
        Book.findById(req.params.id, function(err, foundBook) {
            // console.log(foundBook.author.id); //is a Mongoose Object
            // console.log(req.user._id);  //is a string
            if(err){
                res.redirect("back");
            } else {
                //does user own the book?
                if(foundBook.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;