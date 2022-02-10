const mongoose = require('mongoose');
const SaleSchema = mongoose.Schema({
  product: { type: mongoose.SchemaTypes.ObjectId, ref: 'Product' },
  store: { type: mongoose.SchemaTypes.ObjectId, ref: 'Store' },
  total_price: Number,
  date_recorded: Date,
});

module.exports = mongoose.model('Sale', SaleSchema);
