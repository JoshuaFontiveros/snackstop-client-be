// Set ALL CRUD Functionalities related to Products
const router = require('express').Router();
const ProductModel = require('../models/product');

// GET, POST, PUT, DELETE Request

router.get('/', (req, res) => {
  ProductModel.find({})
    .populate('category')
    .then(result => {
      res.send(result);
    });
});

// check if product already exists
router.get('/:productID', (req, res) => {
  ProductModel.findById(req.params.productID)
    .populate('category')
    .then(result => {
      if (result) {
        res.send(result);
      }
    });
});

// adds new product
router.post('/', (req, res) => {
  console.log(req.body);
  let newProduct = new ProductModel(req.body);
  newProduct.save().then(result => {
    if (result) {
      res.send(result);
    } else {
      res.status(500).send('Product was not created.');
    }
  });
});

// updates product
router.put('/:productID', (req, res) => {
  ProductModel.findByIdAndUpdate(req.params.productID, req.body).then(
    result => {
      if (result) {
        res.send(result);
      } else {
        res.send({ error: `Product was not updated!` });
      }
    }
  );
});

// deletes product
router.delete('/:productID', (req, res) => {
  ProductModel.findByIdAndRemove(req.params.productID).then(result => {
    if (result) {
      console.log(result);
      res.send(result);
    } else {
      res.status(500).send('Product was not deleted');
    }
  });
});

module.exports = router;
