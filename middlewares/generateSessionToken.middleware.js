const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateSessionToken = async (req, res, next) => {
  try {
    existingUser = res.locals.existingUser;
    const sessionTokenSecretKey = process.env.SESSION_TOKEN_SECRET_KEY;
    const sessionTokenDuration = process.env.SESSION_TOKEN_DURATION;
    console.log(sessionTokenSecretKey);
    const payload = { 
      userId: existingUser._id,
      userName: existingUser.userName,
    };
    const options = { 
      algorithm: "HS256",
      expiresIn: sessionTokenDuration
    };
    const sessionToken = await jwt.sign( payload, 
      sessionTokenSecretKey, 
      options, 
    );
    res.locals.sessionToken = sessionToken;
    next();
  } catch (err) {
    const customMessage = "Error while generating token."
    const errorMessage = `${customMessage} ${err.message}`; 
    throw new Error(errorMessage);
  }
};

module.exports = generateSessionToken;
