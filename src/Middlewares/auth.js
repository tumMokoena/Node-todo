const jwt = require("jsonwebtoken");
const { listenerCount } = require("../Models/userSchema");


const verifyToken = (req, res, next) => {

  console.log(req.headers)
  var token = ""

   try {

    const authHeader = req.headers["authorization"]
    console.log(authHeader)

    token = authHeader.split(" ")[1];
    console.log(token)

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

   } catch (error) {

     console.log(error.message)
     return res.status(403).json({ success: false, message : "authentication shoul be included"})

   }
    
    try {

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);
      req.user = decoded;

    } catch (err) {
      console.log(err.message)
      return res.status(401).send("Invalid Token");

    }

    return next();

  };

  module.exports = verifyToken