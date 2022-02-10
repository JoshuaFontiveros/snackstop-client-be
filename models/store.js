const mongoose = require('mongoose');
const StoreSchema = mongoose.Schema({
  branch: String,
  supplies: { type: mongoose.SchemaTypes.ObjectId, ref: 'Supplies' },
  product: { type: mongoose.SchemaTypes.ObjectId, ref: 'Product' },
  address: String,
});

module.exports = mongoose.model('Store', StoreSchema);
