const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userDataSchema = new mongoose.Schema({
  userName: { 
    type: String,
    required: [true, 'Provide a username'],
  },
  userEmail: {
    type: String,
    required: [true, 'Provide a valid email address'],
    trim: true,
    lowercase: true,
  },
  userPassword: {
    type: String,
    required: [true, 'Provide a non-empty password'],
  }
});

userDataSchema.pre('save', async function(next) {
  try {
    if (this.userName.trim().length === 0) {
      throw new Error('Username cannot be empty');
    }
    if (this.userPassword.trim().length > 0) {
      const hashedPassword = await bcrypt.hash(this.userPassword, 10);
      this.userPassword = hashedPassword;
    } else {
      throw new Error('Password cannot be empty');
    }
    next();
  } catch (err) {
    next(err);
  }
});

const userDB =  mongoose.model("userDB", userDataSchema);
module.exports  = userDB;
// NOTE: In mongodb database, you find a collection `userdbs` in admin database
