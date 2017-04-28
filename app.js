var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    // Book            = require("./models/book"),
    // Comment         = require("./models/comment"),
    User            = require("./models/user");
    //seedDB          = require("./seeds");

    
/*-------------------DATABASE--------------------------------------------------*/
//mongod --bind_ip=$IP --nojournal
//mongod --repair
//connect to the db
mongoose.Promise = global.Promise; //to get rid of deprecation warning on .save()
mongoose.connect("mongodb://localhost/booksdb"); 


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//mongoose = require('mongoose').set('debug', true);
//seedDB();

//============================
// PASSPORT CONFIGURATION
//============================
app.use(require("express-session")({
    secret: "I LOVE UMARI",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate())); //User.authenticate method comes with passport-local-mongoose
// these methods also come with passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// will call this function on every single route and every template will have currentUser available and equal to currently logged in user
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

/*---------------------------- REQUIRING ROUTES----------------------------------------- */


var booksRoutes         = require("./routes/books"), 
    commentRoutes       = require("./routes/comments"),
    authRoutes          = require("./routes/index");

app.use(authRoutes);
app.use("/books", booksRoutes);
app.use("/books/:id/comments", commentRoutes);
/*-----------------------------SERVER-----------------------------------------*/
// RUN THE SERVER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is up!");
});