const jwt = require('jsonwebtoken');
const { users } = require('../models/userModel');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }


        const user = users.find(u => u.id === decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
