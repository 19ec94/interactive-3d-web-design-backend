const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateSessionToken = async (req, res, next) => {
  // Get Header from request.
  const authHeader = req.headers.authorization 
  // Extract session token from header.
  const sessionToken = authHeader && authHeader.split(' ')[1];

  //sessionToken = req.headers.authorization;
  console.log(sessionToken);

  if (!sessionToken) {
    return res.status(401).json(
      {
        "status": "error",
        "data": {},
        "error": {
          "code": 401,
          "message": "No token provided." 
        }
      }
    );
  } else {
    const sessionTokenSecretKey = process.env.SESSION_TOKEN_SECRET_KEY;

    await jwt.verify(sessionToken, sessionTokenSecretKey, 
      (err, decoded) => {
        if (err){
          return res.status(403).json(
            {
              "status": "error",
              "data": {},
              "error": {
                "code": 401,
                "message": err.message 
              }
            }
          );
        } else {
          console.log(decoded);
          next();
        }
      }
    );
  }
};

module.exports = authenticateSessionToken;
