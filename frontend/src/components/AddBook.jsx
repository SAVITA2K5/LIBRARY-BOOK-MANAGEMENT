import axios from "axios";
import { useState } from "react";

function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    publishedYear: "",
    availableCopies: ""
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/books", {
        title: book.title,
        author: book.author,
        category: book.category,
        publishedYear: Number(book.publishedYear),
        availableCopies: Number(book.availableCopies)
      });

      alert("Book added successfully");

      // Reset form
      setBook({
        title: "",
        author: "",
        category: "",
        publishedYear: "",
        availableCopies: ""
      });

      // Refresh book list
      window.location.reload();
    } catch (error) {
      alert("Error adding book");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Book</h2>

      <input
        type="text"
        name="title"
        placeholder="Book Title"
        value={book.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="author"
        placeholder="Author Name"
        value={book.author}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={book.category}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="publishedYear"
        placeholder="Published Year"
        value={book.publishedYear}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="availableCopies"
        placeholder="Available Copies"
        value={book.availableCopies}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBook;
