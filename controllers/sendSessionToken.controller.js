
const sendSessionToken = async (req, res)=> {
  try {
    const existingUser = res.locals.existingUser; 
    const sessionToken  = res.locals.sessionToken;
    res.cookie('sessionToken', sessionToken, { httpOnly: true });
    res.status(201).json(
      {
        "status": "sucesss",
        "data": { 
          "userName": existingUser.userName,
          "userEmail": existingUser.userEmail,
          "token": sessionToken
        },
      }
    );
    console.log("User logged in sucessfully");
  } catch(err) {
    res.status(500).json(
      {
        "status": "error",
        "data": {},
        "error": {
          "code": 500,
          "message": err.message 
        }
      }
    );
  }
};

module.exports = sendSessionToken;
