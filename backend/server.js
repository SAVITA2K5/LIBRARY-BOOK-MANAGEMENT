console.log("SERVER FILE LOADED ✅");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookRoutes = require("./routes/books"); // 👈 MUST EXIST

const app = express();

app.use(cors());
app.use(express.json());
app.get("/ping", (req, res) => {
  res.send("PING OK");
});


// 👇 THIS MUST BE BEFORE app.listen
app.use("/api/books", bookRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/libraryDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

