
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user.js');

module.exports = {
    create,
    login,
    checkToken,
    updateProfile,
    deleteProfile,
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


async function updateProfile(req, res) {
  try {
    const { userId } = req.params;
    const updatedData = req.body; // This should contain the updated profile data
    console.log(updatedData);
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


async function deleteProfile(req, res) {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}