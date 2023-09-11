const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const User = require('../../models/user.js');

router.post('/', usersCtrl.create);


router.post('/login', usersCtrl.login);

router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

router.get('/', async (req, res) => {
  try {
      // Query the database to get all users
    const users = await User.find();
  
      // Return the user data as JSON
    res.json(users);
  } catch (error) {
      // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
  

module.exports = router;