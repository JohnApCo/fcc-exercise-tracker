const mongoose = require("mongoose"); // Erase if already required
/* 
{
  username: "fcc_test",
  _id: "5fb5853f734231456ccb3b05"
}
*/
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { versionKey: false }
);

//Export the model
module.exports = mongoose.model("User", userSchema);
