const scoreDB = require('../models/scoreModel');

const getAllScores = async (req, res) => {

  try {
    let scores = await scoreDB.find({});
    console.log("allScores: ", scores)
    res.status(200).json(
      {
        "status": "success",
        "data": scores,
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

module.exports = getAllScores;
