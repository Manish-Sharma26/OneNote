const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/test";

const connectDb = ()=>{
  mongoose.connect(mongoURI)
  .then(()=>{console.log("Connected to mongoo successfully")})
  .catch(()=>{console.log("no connection")})
}
  

module.exports = connectDb;