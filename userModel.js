var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var UserSchema = new Schema({

  //Customer's name  
  name: {
    type: String,
    trim: true,
    required: "Did you enter customer's name?"
  },

 //Customer's phone number
  phone: {
    type: String,
    trim: true,
    validate: 
        [function(input) {
          return input.length >= 7;
        },
        "Did you enter a phone number?"
      ]
  },

  //Customer's email
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Did you enter a valid email address?"]
  },

  // The default value is the current date
  dateTaken: {
    type: Date,
    default: Date.now
  },

  //The date the cake is to be ready
  dateFor: {
    type: Date,
  },


});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
