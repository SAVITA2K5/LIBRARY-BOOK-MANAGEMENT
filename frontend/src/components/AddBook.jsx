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

    await axios.post("http://localhost:5000/api/books", {
      ...book,
      publishedYear: Number(book.publishedYear),
      availableCopies: Number(book.availableCopies)
    });

    alert("Book added successfully");
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Book</h2>

      <input name="title" placeholder="Title" onChange={handleChange} required /><br />
      <input name="author" placeholder="Author" onChange={handleChange} required /><br />
      <input name="category" placeholder="Category" onChange={handleChange} required /><br />
      <input name="publishedYear" placeholder="Published Year" onChange={handleChange} required /><br />
      <input name="availableCopies" placeholder="Available Copies" onChange={handleChange} required /><br /><br />

      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBook;
