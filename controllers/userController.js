const User = require("../models/user.model");
const crypto = require("node:crypto");

const getValidUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      res.status(401).json({message: 'Your email is wrong'});
    } else if (user.password === encryptPassword(req.body.password)) {
      let sanitizedUser = await getSanitizedUser(user._id);
      res.status(200).json(sanitizedUser);
    } else {
      res.status(401).json({message: 'Your password doesn\'t match'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const createUser = async (req, res) => {
  const user = new User({
    ...req.body, password: encryptPassword(req.body.password)
  });
  try {
    const newUser = await user.save();
    res.status(201).json(getSanitizedUser(newUser._id));
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const updateUserByEmail = async (req, res) => {
  try {
    const updatedUser = await User
    .findOneAndUpdate({email: req.body.email}, req.body, {new: true});
    if (updatedUser) {
      res.status(200).json(getSanitizedUser(updatedUser._id));
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getSanitizedUser = async (id) => {
  return User
  .findById(id).select('-_id -__v -password');
}

const encryptPassword = (password) => {
  return crypto.createHash('sha512').update(password).digest('hex');
}

const UserController = {createUser, getValidUserByEmail, updateUserByEmail};
module.exports = UserController;
