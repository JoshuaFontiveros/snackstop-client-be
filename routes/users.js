// Set ALL CRUD Functionalities related to Products
const router = require('express').Router();
const UserModel = require('../models/user');

// GET, POST, PUT, DELETE Request

router.get('/', (req, res) => {
  UserModel.find({})
    .populate('store')
    .then(result => {
      res.send(result);
    });
});

// check if user already exists
router.get('/:userID', (req, res) => {
  UserModel.findById(req.params.userID).then(result => {
    if (result) {
      res.send(result);
    }
  });
});

// adds new  user
router.post('/', (req, res) => {
  console.log(req.body);
  let newUser = new UserModel(req.body);
  newUser.save().then(result => {
    if (result) {
      res.send(result);
    } else {
      res.status(500).send('User was not created.');
    }
  });
});

// updates user
router.put('/:userID', (req, res) => {
  UserModel.findByIdAndUpdate(req.params.serID, req.body).then(result => {
    if (result) {
      res.send(result);
    } else {
      res.send({ error: `User was not updated!` });
    }
  });
});

// deletes user
router.delete('/:userID', (req, res) => {
  UserModel.findByIdAndRemove(req.params.userID).then(result => {
    if (result) {
      console.log(result);
      res.send(result);
    } else {
      res.status(500).send('User was not deleted');
    }
  });
});

module.exports = router;
