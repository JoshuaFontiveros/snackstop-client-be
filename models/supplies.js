const mongoose = require('mongoose');
const SuppliesSchema = mongoose.Schema({
  name: String,
  quantity: Number,
  image: String,
});

module.exports = mongoose.model('Supplies', SuppliesSchema);
