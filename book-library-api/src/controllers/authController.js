const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../models/userModel');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, username, password: hashedPassword, role: 'user' };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
