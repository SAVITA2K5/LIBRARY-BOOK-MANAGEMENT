import axios from "axios";
import { useEffect, useState } from "react";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Books</h2>
      {books.length === 0 && <p>No books found</p>}
      {books.map(book => (
        <div key={book._id}>
          <strong>{book.title}</strong> — {book.author}
          <br />
          Category: {book.category} | Copies: {book.availableCopies}
          <hr />
        </div>
      ))}
    </div>
  );
}

export default BookList;
