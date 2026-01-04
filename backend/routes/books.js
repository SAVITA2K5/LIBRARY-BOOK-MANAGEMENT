console.log("BOOK ROUTES LOADED ✅");

const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

/* 1️⃣ CREATE BOOK */
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: "Invalid book data" });
  }
});

/* 2️⃣ READ ALL BOOKS */
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

/* 3️⃣ READ BY CATEGORY */
router.get("/category/:cat", async (req, res) => {
  const books = await Book.find({ category: req.params.cat });
  res.json(books);
});

/* 4️⃣ READ AFTER YEAR 2015 */
router.get("/after/2015", async (req, res) => {
  const books = await Book.find({ publishedYear: { $gt: 2015 } });
  res.json(books);
});

/* 5️⃣ UPDATE COPIES */
router.put("/:id/copies", async (req, res) => {
  const { change } = req.body;

  const book = await Book.findById(req.params.id);
  if (!book)
    return res.status(404).json({ error: "Book not found" });

  if (book.availableCopies + change < 0)
    return res.status(400).json({ error: "Negative stock not allowed" });

  book.availableCopies += change;
  await book.save();

  res.json(book);
});

/* 6️⃣ CHANGE CATEGORY */
router.put("/:id/category", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book)
    return res.status(404).json({ error: "Book not found" });

  book.category = req.body.category;
  await book.save();

  res.json(book);
});

/* 7️⃣ DELETE IF COPIES = 0 */
router.delete("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book)
    return res.status(404).json({ error: "Book not found" });

  if (book.availableCopies !== 0)
    return res.status(400).json({
      error: "Cannot delete book with available copies"
    });

  await book.deleteOne();
  res.json({ message: "Book deleted" });
});

module.exports = router;
