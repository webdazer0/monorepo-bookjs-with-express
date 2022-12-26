const { Router } = require("express");
const router = Router();

const bookController = require("../controllers/book.controller");

router.route("/").get(bookController.getBooks).post(bookController.addBook);

router.route("/:id").delete(bookController.deleteBook);

module.exports = router;
