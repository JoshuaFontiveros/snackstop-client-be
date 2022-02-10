const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
  name: String,
  contact: Number,
  store: { type: mongoose.SchemaTypes.ObjectId, ref: 'Store' },
  username: String,
  password: String,
  role: String,
});

module.exports = mongoose.model('User', UserSchema);
