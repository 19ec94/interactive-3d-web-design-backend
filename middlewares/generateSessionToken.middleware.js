const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateSessionToken = async (req, res, next) => {
  try {
    //TODO: The following line assumes local variable is set in 
    // middlware isExistingUser or addNewUserToDatabase.
    // Implement standalone solution
    existingUser = res.locals.existingUser;

    const sessionTokenSecretKey = process.env.SESSION_TOKEN_SECRET_KEY;
    const sessionTokenDuration = process.env.SESSION_TOKEN_DURATION;

    console.log(sessionTokenSecretKey);

    //TODO: Include necessary payload details.
    const payload = { 
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

    // Set sessionToken to local variables to make in available further down the
    // middleware chain.
    res.locals.sessionToken = sessionToken;

    next();
  } catch (err) {
    const customMessage = "Error while generating token."
    const errorMessage = `${customMessage} ${err.message}`; 
    throw new Error(errorMessage);
  }
};

module.exports = generateSessionToken;
