// BookDetails.js
import React, { useEffect, useState } from 'react';
import { getBookById } from '../services/bookService';

function BookDetails({ id }) {
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const bookData = await getBookById(id);
                setBook(bookData);
                setError(null);
            } catch (error) {
                setError('Failed to fetch book details. Please try again later.');
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!book) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Year: {book.year}</p>

        </div>
    );
}

export default BookDetails;
