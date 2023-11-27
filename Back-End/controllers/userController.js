const userSchema = require('../models/userSchema');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');

const createUserValidation = [
  body('email','incorrect email').isEmail(),
  body('name','incorrect name').isLength({ min: 5 }),
  body('password', 'Incorrect password').isLength({ min: 5 }),
  body('address','incorrect address').isLength({min:5}),
];

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(501).json({ errors: errors.array() });
  }

  const user = new userSchema({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
  });

  user
    .save()
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(501).json({ message: "An error occurred" });
    });
};

const signInUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Find the user by their email
    const userData = await userSchema.findOne({ email });

    if (!userData) {
      return res.status(401).json({ message: "Try logging with correct credentials" });
    }

    // Use bcrypt to compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return res.status(401).json({success: false});
    }

    // Password is valid, return a success response
    return res.status(201).json(userData.role
       + " " + userData._id
       );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  createUserValidation, 
  signInUser
};
