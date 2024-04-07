const User = require("../models/user.model");
const crypto = require("node:crypto");

const getValidUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      res.status(401).json({message: 'Your email is wrong'});
    } else if (user.password === encryptPassword(req.body.password)) {
      res.status(200).json(await getSanitizedUser(user._id));
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
    res.status(201).json(await getSanitizedUser(newUser._id));
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const updateUserByEmail = async (req, res) => {
  try {
    const existingUser = await User.findOne({email: req.body.email});

    if (!existingUser) {
      res.status(404).json({message: 'User not found'});
      return;
    }
    const {firstName, lastName, email, phone, address, password} = req.body;

    if (firstName && existingUser.firstName !== firstName) {
      existingUser.firstName = firstName;
    }
    if (lastName && existingUser.lastName !== firstName) {
      existingUser.lastName = lastName;
    }
    if (email && existingUser.email !== email) {
      existingUser.email = email;
    }
    if (phone && existingUser.phone !== phone) {
      existingUser.phone = phone;
    }
    if (address && existingUser.address !== address) {
      existingUser.address = address;
    }
    if (password && existingUser.password !== password) {
      existingUser.password = password;
    }

    const updatedUser = await existingUser.save();
    res.status(200).json(await getSanitizedUser(updatedUser._id));
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getSanitizedUser = async (id) => {
  return User
  .findById(id).select('-_id -__v -password').lean();
}

const encryptPassword = (password) => {
  return crypto.createHash('sha512').update(password).digest('hex');
}

const UserController = {createUser, getValidUserByEmail, updateUserByEmail};
module.exports = UserController;
