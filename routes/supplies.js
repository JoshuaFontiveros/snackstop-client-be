const router = require('express').Router();
const SuppliesModel = require('../models/supplies');

// GET, POST, PUT, DELETE Request

router.get('/', (req, res) => {
  SuppliesModel.find({}).then(result => {
    res.send(result);
  });
});

// check if supplies already exists
router.get('/:suppliesID', (req, res) => {
  SuppliesModel.findById(req.params.suppliesID).then(result => {
    if (result) {
      res.send(true);
    }
  });
});

// adds new supply
router.post('/', (req, res) => {
  let newSupplies = new SuppliesModel(req.body);
  newSupplies.save().then(result => {
    if (result) {
      res.send(result);
    } else {
      res.send({ error: 'Supply was not created.' });
    }
  });
});

// updates supply
router.put('/:suppliesID', (req, res) => {
  SuppliesModel.findByIdAndUpdate(req.params.productID, req.body).then(
    result => {
      if (result) {
        res.send(result);
      } else {
        res.send({ error: 'Supply was not updated.' });
      }
    }
  );
});

// deletes supply

router.delete('/:suppliesID', (req, res) => {
  SuppliesModel.findByIdAndRemove(req.params.productID).then(result => {
    if (result) {
      res.send(result);
    } else {
      res.status(500).send('Supply was not deleted.');
    }
  });
});
module.exports = router;
