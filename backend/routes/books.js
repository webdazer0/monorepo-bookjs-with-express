const { Router } = require("express");
const router = Router();
const { unlink } = require("fs-extra");
const path = require("path");

const { getBooks, addBook, deleteBook } = require("../controllers/bookCtrl");
const Book = require("../models/Book");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get("/", getBooks);

router.post("/", addBook);

router.delete("/:id", deleteBook);

module.exports = router;
