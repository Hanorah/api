// bookService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Make sure this matches your backend URL

// Fetch all books
const getBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/books`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];  // Return an empty array in case of error
    }
};

// Add a new book
const addBook = async (book) => {
    try {
        const response = await axios.post(`${API_URL}/books`, book, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;  // Return the added book data for further use
    } catch (error) {
        console.error('Error adding book:', error);
        throw new Error('Failed to add book');
    }
};

// Delete a book by ID
const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/books/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;  // Return success message or updated book list
    } catch (error) {
        console.error('Error deleting book:', error);
        throw new Error('Failed to delete book');
    }
};

// Get a specific book by ID
const getBookById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/books/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching book by ID:', error);
        throw new Error('Failed to fetch book details');
    }
};

// Update an existing book by ID
const updateBook = async (id, updatedBook) => {
    try {
        const response = await axios.put(`${API_URL}/books/${id}`, updatedBook, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;  // Return the updated book data
    } catch (error) {
        console.error('Error updating book:', error);
        throw new Error('Failed to update book');
    }
};

// Export all functions together
export { getBooks, addBook, deleteBook, getBookById, updateBook };
