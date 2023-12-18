const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
   userName: String,
   password: String,
   joinDate: String,
   lastLogin: String,
});

module.exports = mongoose.model("User", userSchema);