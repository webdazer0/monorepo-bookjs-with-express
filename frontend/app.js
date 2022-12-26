import bookController from "./book.controller";
import "./css/app.css";

const bookFormContainer = document.getElementById("book-form");
const bookCardsContainer = document.getElementById("books-cards");

document.addEventListener("DOMContentLoaded", bookController.renderBooks);
bookFormContainer.addEventListener("submit", bookController.addNewBook);
bookCardsContainer.addEventListener("click", bookController.deleteBook);
