const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
  friendId: {
    type: String,
    required: true,
  },
  friendsList: [{
    type: Schema.Types.ObjectId,
    ref: 'PersonID'
  }]
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
