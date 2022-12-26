const { unlink } = require("fs-extra");
const Book = require("../models/Book");
const imageService = require("../services/image.service");

const bookCtrl = {};

bookCtrl.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ created_at: "asc" });
    // const books = await Book.update({}, {$unset: {__v: 1 }} , {multi: true});
    res.json(books);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

bookCtrl.addBook = async (req, res) => {
  try {
    const { title, author, isbn } = req.body;
    // console.log(req.file);
    const result = await imageService.uploadImage(req.file.path);
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
    console.log(error);
    res.json({ message: error.message });
  }
};

bookCtrl.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    const bookId = book.public_id;
    const result = await imageService.deleteImage(book.bookId);
    console.log(result);
    res.json({ message: "Book Deleted" });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

module.exports = bookCtrl;
