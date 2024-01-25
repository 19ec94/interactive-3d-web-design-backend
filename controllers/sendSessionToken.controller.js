
const sendSessionToken = async (req, res)=> {
  try {
    const existingUser = res.locals.existingUser; 
    const sessionToken  = res.locals.sessionToken;
    res.cookie('sessionToken', sessionToken, {
      httpOnly: true,
      sameSite: 'Lax',
    });
    res.status(200).json(
      {
        "status": "sucesss",
        "data": { 
          "userName": existingUser.userName,
          "userEmail": existingUser.userEmail,
          "token": sessionToken
        },
      }
    );
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
