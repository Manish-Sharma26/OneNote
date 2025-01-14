var jwt = require('jsonwebtoken');
const JWT_SECRET = "Manish$master";

const fetch=(req,res,next)=>{
  //fetching user details
  const token = req.header('auth-token');
  if(!token){
    res.status(401).send({error:"Authentication failed"})
  }
  try {
    const data = jwt.verify(token,JWT_SECRET);
    // console.log(data);
    req.user = data.user;
    next();
    
  } catch (error) {
    res.status(401).send({error:"Authentication failed"})
  }
}

module.exports = fetch;