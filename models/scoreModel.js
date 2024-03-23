const mongoose = require('mongoose');

const scoreDataSchema = new mongoose.Schema({
  userName: { 
    type: String,
    required: [true, 'Provide a username'],
  },
  wonLevel1: {
    type: Boolean,
    default: false
  },
  wonLevel2: {
    type: Boolean,
    default: false
  },
  scoresLevel1: {
    type: Number,
    default: 0,
  },
  scoresLevel2: {
    type: Number,
    default: 0,
  }
});

scoreDataSchema.pre('save', async function(next) {
  try {
    if (this.userName.trim().length === 0) {
      throw new Error('Username cannot be empty');
    }
   
    next();
  } catch (err) {
    next(err);
  }
});

const scoreDB =  mongoose.model("scores", scoreDataSchema);
module.exports  = scoreDB;
// NOTE: User scores are stored in collection named "scores"

