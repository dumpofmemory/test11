var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/", function(req, res){
    res.render("landing");
});





//=================================
// AUTH ROUTES
//================================
router.get("/register", function(req, res) {
   res.render("register"); 
});
//handle sign up logic
router.post("/register", function(req, res) {
    //User.register is provided by passport-local-mongoose
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, newlyCreatedUser){
        if(err) {
            console.log(err);
            return res.render("register"); // nice way to short circuit and get out of this entire callback if we return
        }
        passport.authenticate("local")(req, res, function(){
            
            res.redirect("/books");
        });
    });
});


router.get("/login", function(req, res) {
//   res.render("login"); 
  res.render("landing"); 
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/books",
        // failureRedirect: "/login"
        failureRedirect: "/"
        
    }), function(req, res) {
    
});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    // res.redirect("/login");
    res.redirect("/");
}

module.exports = router;