var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

// Requiring the `User` model for accessing the `users` collection
var User = require("./userModel.js");
// Initialize express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/cakes", { useNewUrlParser: true });

// Routes

// Route to post form submission to mongoDB via mongoose
app.post("/submit", function(req, res) {
  // Create a new user using req.body
    User.create(req.body)
    .then(function(dbUser) {
      // If saved successfully, send the the new User document to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send the error to the client
      res.json(err);
    });
});

//Route to retrieve cake data from mongoDB via mongoose

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
