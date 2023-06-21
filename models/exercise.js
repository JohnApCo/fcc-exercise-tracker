const mongoose = require("mongoose"); // Erase if already required
/* 
{
  username: "fcc_test",
  description: "test",
  duration: 60,
  date: "Mon Jan 01 1990",
  _id: "5fb5853f734231456ccb3b05"
}
*/
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

//Export the model
module.exports = mongoose.model("Exercise", userSchema);
