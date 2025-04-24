// routes/bookRoutes.js
const express = require('express');
const { books } = require('../models/bookModel');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure this is correct
const router = express.Router();

// Middleware for role-based access (admin check)
function adminOnly(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
}

// GET /books: Retrieve a list of all books (authenticated users only)
router.get('/books', authMiddleware.authenticateToken, (req, res) => {
    res.json(books);
});

// GET /books/:id: Retrieve details of a specific book by its ID (authenticated users only)
router.get('/books/:id', authMiddleware.authenticateToken, (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
});

// POST /books: Add a new book (authenticated users only)
router.post('/books', authMiddleware.authenticateToken, (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
        return res.status(400).json({ message: 'Title, author, and year are required' });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author,
        year
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /books/:id: Update an existing book (authenticated users only)
router.put('/books/:id', authMiddleware.authenticateToken, (req, res) => {
    const { title, author, year } = req.body;
    const book = books.find(b => b.id === parseInt(req.params.id));

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    if (!title || !author || !year) {
        return res.status(400).json({ message: 'Title, author, and year are required' });
    }

    book.title = title;
    book.author = author;
    book.year = year;

    res.json(book);
});

// DELETE /books/:id: Delete a book (admins only)
router.delete('/books/:id', authMiddleware.authenticateToken, adminOnly, (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));

    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    books.splice(bookIndex, 1);
    res.status(204).json({ message: 'Book deleted successfully' });
});

module.exports = router;
