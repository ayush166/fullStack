const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const Schema = mongoose.Schema;

// 3. (b) . receive the text that was inserted from the frontend and insert it in another Model and Table
const textInputSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  friendId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});


textInputSchema.pre('save', function(next) {

  
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});


const TextInput = mongoose.model('textInput', textInputSchema);

module.exports = TextInput;
