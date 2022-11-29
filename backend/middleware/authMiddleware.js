const jsonToken = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // GET TOKEN FROM HEADERS
            token = req.headers.authorization.split(' ')[1];
            // VERIFY TOKEN
            const decoded = jsonToken.verify(token, process.env.JWT_SECRET);
            // GET USER FROM TOKEN
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not Authorized');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Not Authorized');
    }
});

module.exports = { protect };
