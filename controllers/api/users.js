
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user.js');

module.exports = {
    create,
    login,
    checkToken,
    updateProfile,

}


async function create(req, res) {
    
    try{
        const user = await User.create(req.body);
        const token = createJWT(user);
        
        res.json(token);
    } catch (err) {
        res.status(400).json(err);
    }
}



async function login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new Error();
      }
  
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        throw new Error();
      }
  
      res.json(createJWT(user));
    } catch {
      res.status(400).json('Bad Credentials');
    }
  }
  


function checkToken(req, res) {
    console.log('req.user', req.user);
    res.json(req.exp);
}

function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h'}
    )
}

const User = require('../models/user');

async function updateProfile(req, res) {
  const userId = req.params.userId;
  const newData = req.body; // The updated profile data from the request body

  try {
    // Find the user by ID and update their profile data
    const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });

    // Return the updated user data as JSON
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

