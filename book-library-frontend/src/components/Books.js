import React, { useEffect, useState } from 'react';
import { getBooks, addBook, deleteBook, updateBook } from '../services/bookService';
import { jwtDecode } from 'jwt-decode';

function Books() {
    const [books, setBooks] = useState([]);
    const [bookInput, setBookInput] = useState({ title: '', author: '', year: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        async function fetchBooks() {
            const bookList = await getBooks();
            setBooks(bookList);
            setFilteredBooks(bookList);
        }

        fetchBooks();

        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserRole(decoded.role);
            } catch (err) {
                console.error('Failed to decode token:', err);
            }
        }
    }, []);

    const handleAddOrUpdateBook = async () => {
        if (!bookInput.title || !bookInput.author || !bookInput.year) {
            alert('Please fill in all fields (Title, Author, Year)!');
            return;
        }

        try {
            if (editingId) {
                await updateBook(editingId, bookInput);
                setEditingId(null);
            } else {
                await addBook(bookInput);
            }

            const updatedBooks = await getBooks();
            setBooks(updatedBooks);
            setFilteredBooks(updatedBooks);
            setBookInput({ title: '', author: '', year: '' });
        } catch (error) {
            console.error('Error saving book:', error);
        }
    };

    const handleDeleteBook = async (id) => {
        await deleteBook(id);
        const updated = await getBooks();
        setBooks(updated);
        setFilteredBooks(updated);
    };

    const handleSearchBook = () => {
        const query = searchQuery.toLowerCase();
        const filtered = books.filter(book =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.year.toString().includes(query)
        );
        setFilteredBooks(filtered);
    };

    const handleEditBook = (book) => {
        setEditingId(book.id);
        setBookInput({ title: book.title, author: book.author, year: book.year });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setBookInput({ title: '', author: '', year: '' });
    };

    return (
        <div className="container">
            <h2>Books</h2>

            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search (Title, Author, or Year)"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearchBook}>Search</button>
            </div>

            {/* Add/Edit Form */}
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Title"
                    value={bookInput.title}
                    onChange={e => setBookInput({ ...bookInput, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={bookInput.author}
                    onChange={e => setBookInput({ ...bookInput, author: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Year"
                    value={bookInput.year}
                    onChange={e => setBookInput({ ...bookInput, year: e.target.value })}
                />
                <button onClick={handleAddOrUpdateBook}>
                    {editingId ? 'Save Changes' : 'Add Book'}
                </button>
                {editingId && <button className="cancel" onClick={handleCancelEdit}>Cancel</button>}
            </div>

            {/* Book List (Table) */}
            <table className="book-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map(book => (
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>
                                    <button onClick={() => handleEditBook(book)}>Edit</button>
                                    {userRole === 'admin' && (
                                        <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="4">No books found with the provided search criteria.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Books;
