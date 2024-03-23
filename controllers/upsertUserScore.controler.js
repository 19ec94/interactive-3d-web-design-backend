const scoreDB = require('../models/scoreModel');

const upsertUserScore = async (req, res) => {

  try {
    console.log("body: ", req.body)
    const userName = req.body.userName;
    // for now we only do basic userName validation - improve validation later
    if (!userName || userName.trim() === '') {
      return res.status(400).json({ error: 'userName is required' });
  };
    const wonLevel1 = req.body.wonLevel1;
    const wonLevel2 = req.body.wonLevel2;
    const scoresLevel1 = req.body.scoresLevel1;
    const scoresLevel2 = req.body.scoresLevel2;
    const updatedUserScore = {
      "userName": userName,
      "wonLevel1": wonLevel1,
      "wonLevel2": wonLevel2,
      "scoresLevel1": scoresLevel1,
      "scoresLevel2": scoresLevel2 };
      console.log("update userScore: ",updatedUserScore)
    const upsertResult = await scoreDB.updateOne({userName: userName}, updatedUserScore, { upsert: true });
    console.log("upsertResult: ", upsertResult)
    
    res.status(200).json(
      {
        "status": "success",
        "data": upsertResult,
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

module.exports = upsertUserScore;
