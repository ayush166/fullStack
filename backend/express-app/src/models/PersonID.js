const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 3. (d) d. Add the persons ID (A) to mongodb
const personIDSchema = new Schema({
  personID: {
    type: String,
    required: true
  },
});

const PersonID = mongoose.model('PersonID', personIDSchema);

module.exports=PersonID