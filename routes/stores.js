const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
const StoreModel = require('../models/store');

// GET, POST, PUT, DELETE Request

router.get('/', (req, res) => {
  StoreModel.find({})
    .populate(['supplies', 'address'])
    .then(result => {
      res.send(result);
    });
});

// Check if a product already exists in the store
router.get('/:productID', (req, res) => {
  StoreModel.find({ product: ObjectId(req.params.productID) }).then(result => {
    if (result) {
      res.send(result);
    }
  });
});

// check if store already exists
router.get('/:storeID', (req, res) => {
  StoreModel.findById(req.params.storeID).then(result => {
    if (result) {
      res.send(result);
    }
  });
});

// if not existing, then we will add a new product in store
router.post('/', (req, res) => {
  let newStoreProduct = new StoreModel(req.body);
  newStoreProduct.save().then(result => {
    res.send(result);
  });
});

router.put('/:storeID', (req, res) => {
  StoreModel.findByIdAndUpdate(req.params.storeID, req.body).then(result => {
    if (result) {
      res.send(result);
    } else {
      res.send({ error: 'Update failed.' });
    }
  });
});

module.exports = router;
