const router = require('express').Router();
const CategoryModel = require('../models/category');

// GET, POST, PUT, DELETE Request

router.get('/', (req, res) => {
  CategoryModel.find({}).then(result => {
    res.send(result);
  });
});

// check if category already exists
router.get('/:categoryID', (req, res) => {
  CategoryModel.findById(req.params.categoryID).then(result => {
    if (result) {
      res.send(true);
    }
  });
});

// adds new category
router.post('/', (req, res) => {
  let newCategory = new CategoryModel(req.body);
  newCategory.save().then(result => {
    if (result) {
      res.send(result);
    } else {
      res.send({ error: 'Category was not created.' });
    }
  });
});

//updates category
router.put('/categoryID', (req, res) => {
  CategoryModel.findByIdAndUpdate(req.params.categoryID, req.body).then(
    result => {
      if (result) {
        res.send(result);
      } else {
        res.send({ error: `Category was not updated.` });
      }
    }
  );
});

// deletes category
router.delete('/:categoryID', (req, res) => {
  CategoryModel.findByIdAndRemove(req.params.categoryID).then(result => {
    if (result) {
      res.send(result);
    } else {
      res.status(500).send(`Category was not deleted`);
    }
  });
});
module.exports = router;
