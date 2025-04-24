const express = require('express');
const cors = require('cors');
const app = express();

// Use dynamic port for deployment (Render, Heroku, etc.)
const port = process.env.PORT || 3000; // fallback to 3000 for local development
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.use(cors());
app.use(express.json());

const authRoutes = require('./controllers/authController');
const bookRoutes = require('./routes/bookRoutes');

app.use('/auth', authRoutes);
app.use('/', bookRoutes);

const SECRET_KEY = 'your-secret-key';

// Authentication middleware
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Access denied' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Admin check middleware
const isAdmin = (req, res, next) => {
    if (req.user.username === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access forbidden: Admins only' });
    }
};

// Test route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start server on dynamic port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
