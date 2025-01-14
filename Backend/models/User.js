const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
  name:{type:String, required:true},
  email:{type:String, required:true,unique:true},
  pass:{type:String, required:true},
  date:{type:String,default:Date.now}
})
const User= mongoose.model("User",userSchema);
module.exports = User;