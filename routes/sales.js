const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
const SaleModel = require('../models/sale');

// GET, POST, PUT, DELETE Request

router.get('/', (req, res) => {
  SaleModel.find({})
    .populate(['product', 'store'])
    .then(result => {
      res.send(result);
    });
});

router.get('/:productID', (req, res) => {
  SaleModel.find({ product: ObjectId(req.params.productID) }).then(result => {
    if (result) {
      res.send(result);
    }
  });
});

router.post('/', (req, res) => {
  let newSaleProducts = new SaleModel(req.body);
  newSaleProducts.save().then(result => {
    res.send(result);
  });
});

// deletes category
router.delete('/:saleID', (req, res) => {
  SaleModel.findByIdAndRemove(req.params.saleID).then(result => {
    if (result) {
      res.send(result);
    } else {
      res.status(500).send(`SaleID was not deleted`);
    }
  });
});
module.exports = router;
