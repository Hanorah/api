const express = require('express');
const { books } = require('../models/bookModel');
const { users } = require('../models/userModel');
const router = express.Router();

// Get all books
router.get('/', (req, res) => {
    res.json(books);
});

// Get a specific book by ID
router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
});

// Add a new book
router.post('/', (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
        return res.status(400).json({ message: 'Title, author, and year are required' });
    }

    const newBook = { id: books.length + 1, title, author, year };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Update a book
router.put('/:id', (req, res) => {
    const { title, author, year } = req.body;
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (!title || !author || !year) {
        return res.status(400).json({ message: 'Title, author, and year are required' });
    }

    book.title = title;
    book.author = author;
    book.year = year;
    res.json(book);
});

// Delete a book (admin only)
router.delete('/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

    // Only admins can delete books
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    books.splice(bookIndex, 1);
    res.status(204).end();
});

module.exports = router;
