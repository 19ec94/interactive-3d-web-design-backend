const scoreDB = require('../models/scoreModel');

const getUserScore = async (req, res) => {

  try {
    const userName = req.params.username;
    let userScore = await scoreDB.findOne({ userName: userName });
    console.log("userDB: ", userScore)
    if (userScore === null) {
      userScore = {
        "userName": userName,
        "wonLevel1": false,
        "wonLevel2": false,
        "scoresLevel1": 0,
        "scoresLevel2": 0 }
    }
    res.status(200).json(
      {
        "status": "success",
        "data": userScore,
      }
    );
  } catch (err) {
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

module.exports = getUserScore;
