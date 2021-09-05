import React, { useEffect, useState } from 'react';
import booksList from './../../mocks/books.json';

const Table = () => {
    const [filter, setFilter] = useState("");
    const [books, setBooks] = useState([]);

    useEffect(() => {
        setBooks(booksList.books);
    }, []);

    const sortBy = (field) => {
        const booksOrdered = [...books].sort((a, b) => {
            return (a[field] < b[field]) ? -1 : 1;
        });

        setBooks(booksOrdered);
    }

    useEffect(() => {
        if(books.length > 0) {
            const filteredBooks = [...books].map(book => {
                if(filter.length > 0 && book.title.indexOf(filter) === -1) {
                    book.hide = true;
                } else {
                    book.hide = false;
                }
                return book;
            });
            setBooks(filteredBooks);
        }
    }, [filter]);

    return (
        <>
        <label>Wpisz wyszukiwane haslo: </label>
            <input value={filter} onChange={(event) => setFilter(event.target.value)} type="text"/>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => sortBy('id')}>ID</th>
                        <th onClick={() => sortBy('title')}>Title</th>
                        <th onClick={() => sortBy('date')}>Date</th>
                        <th onClick={() => sortBy('pages')}>Pages</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map((book, index) => {
                            if(!book.hide) {
                                return (
                                    <tr key={`book-list-element-${index}`}>
                                        <td>{book.id}</td>
                                        <td>{book.title}</td>
                                        <td>{book.date}</td>
                                        <td>{book.pages}</td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
export default Table