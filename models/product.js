const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
  name: String,
  category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
  baseprice: Number,
  markup: Number,
  quantity: Number,
  date: Date,
});

module.exports = mongoose.model('Product', ProductSchema);
