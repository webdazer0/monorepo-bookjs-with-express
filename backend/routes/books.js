const { Router } = require("express");
const router = Router();
const { unlink } = require("fs-extra");
const path = require("path");

const Book = require("../models/Book");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.post("/", async (req, res) => {
  const { title, author, isbn } = req.body;
  // console.log(req.file);
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  // console.log(result);
  const newBook = new Book({
    title,
    author,
    isbn,
    imagePath: result.secure_url,
    public_id: result.public_id,
  });
  await newBook.save();
  await unlink(req.file.path);
  res.json({ message: "Book Saved" });
});

router.delete("/:id", async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  const result = await cloudinary.v2.uploader.destroy(book.public_id);
  console.log(result);
  res.json({ message: "Book Deleted" });
});

module.exports = router;
