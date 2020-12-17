const { unlink } = require("fs-extra");
const path = require("path");
const cloudinary = require("../services/cdn");

const Book = require("../models/Book");

// const eager_options = {
//   width: 240,
//   height: 150,
//   crop: "scale",
//   format: "jpg",
// };
const eager_options = {
  width: 240,
  crop: "scale",
  format: "jpg",
};
const bookCtrl = {};

bookCtrl.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

bookCtrl.addBook = async (req, res) => {
  try {
    const { title, author, isbn } = req.body;
    // console.log(req.file);
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      upload_preset: "book_app",
      eager: eager_options,
    });
    console.log(result);
    const newBook = new Book({
      title,
      author,
      isbn,
      imagePath: result.secure_url,
      imageThumb: result.eager[0].secure_url,
      public_id: result.public_id,
    });
    await newBook.save();
    await unlink(req.file.path);
    res.json({ message: "Book Saved" });
  } catch (error) {
    console.log(error.message);
    res.json({ message: "Something went wrong" });
  }
};

bookCtrl.deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  const result = await cloudinary.v2.uploader.destroy(book.public_id);
  console.log(result);
  res.json({ message: "Book Deleted" });
};

module.exports = bookCtrl;
