const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const User = require('../../models/user.js');

router.post('/', usersCtrl.create);


router.post('/login', usersCtrl.login);

router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);




// Display user profile
// router.get('/User/ProfilePage/:userId', async (req, res) => {
//     try {
//       const userId = req.params.userId;
//       const user = await User.findById(userId);
      
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       res.json(user);
//     } catch (error) {
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });

  router.get('/User/ProfilePage/:userId', (req, res) => {
    const { userID } = req.params;
  
    // Fetch user data based on userID (e.g., from a database)
    const userData = fetchUserData(userID);
  
    if (!userData) {
      // Handle the case where the user with the given ID is not found
      res.status(404).json({ error: 'User not found' });
    } else {
      // Return the user data
      res.json(userData);
    }
  });
  





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