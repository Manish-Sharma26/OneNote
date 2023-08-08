const connectDb = require('./db');
const express = require('express');
connectDb();
const port = 5000;
app = express();

// app.get("/",(req,res)=>{
//   res.send("Hello world");
// })
app.use(express.json());
app.use("/api/auth",require('./routes.js/auth'));
app.use("/api/notes",require('./routes.js/notes'));
app.listen(port,()=>{
  console.log(`Listening to port: ${port} Successfully`)
})
