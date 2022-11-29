const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jsonToken = require('jsonwebtoken');
const User = require('../models/userModel');

// GENERATE TOKEN
const generateToken = (id) => {
    return jsonToken.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    // VALIDATION
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please include all fields');
    }
    // CHECK IF USER IS EXISTS
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // CREATE USER
    const user = await User.create({ name, email, password: hashedPassword });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data!');
    }
});

// LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    // CHECK USER & PASSWORDS MATCH
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid Data');
    }
});

const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
    };
    res.status(200).json(user);
});

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
