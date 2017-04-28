var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Book = require("../models/book");

//======================================
// COMMENTS ROUTES
//======================================
router.get("/new", isLoggedIn, function(req, res){
   //find book by id
   Book.findById(req.params.id, function(err, book){
       if(err) {
           console.log(err);
       } else {
           res.render("comments/new", {book: book});
       }
   });
});


router.post("/", isLoggedIn, function(req, res){
   //lookup book using ID
   Book.findById(req.params.id, function(err, book) {
       if(err) {
           console.log(err);
           res.redirect("/books");
       } else {
           Comment.create(req.body.comment, function(err, comment){
               if(err) {
                   console.log(err);
               } else {
                   //add username and id to comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   // save comment
                   comment.save();
                   book.comments.push(comment);
                   book.save();
                //   res.redirect("/books/" + book._id);
                   res.redirect("/books");
               }
           });
       }
   });
   // create new commnet
   //connect new comment to book
   // redirect book show page
});

//MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;