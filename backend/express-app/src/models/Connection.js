const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
//3. a log to cons connection times made from frontend
const connectionSchema = new Schema({
  count: { type: Number, default: 0 },
  lastConnected: { type: Date, default: Date.now }
});

const Connection = mongoose.model('Conn', connectionSchema);

module.exports = Connection;
