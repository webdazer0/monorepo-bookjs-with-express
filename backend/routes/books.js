const { Router } = require("express");
const router = Router();

const bookController = require("../controllers/bookCtrl");

router.route("/").get(bookController.getBooks).post(bookController.addBook);

router.route("/:id").delete(bookController.deleteBook);

module.exports = router;
