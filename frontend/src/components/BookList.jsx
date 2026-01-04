import axios from "axios";
import { useEffect, useState } from "react";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then(response => setBooks(response.data))
      .catch(error => console.error("Error fetching books:", error));
  }, []);

  return (
    <div>
      <h2>Available Books</h2>

      {books.length === 0 && <p>No books available</p>}

      {books.map(book => (
        <div className="book" key={book._id}>
          <div className="book-title">{book.title}</div>
          <div>Author: {book.author}</div>
          <div>Category: {book.category}</div>
          <div>Published Year: {book.publishedYear}</div>
          <div>Available Copies: {book.availableCopies}</div>
        </div>
      ))}
    </div>
  );
}

export default BookList;

