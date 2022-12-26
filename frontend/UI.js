import BookService from "./services/BookService";
import { format } from "timeago.js";
require("./addLang"); // Aggiunge lingue: Italiano & Spagnolo
const newBook = new BookService();
const booksCardContainer = document.getElementById("books-cards");

class UI {
  cardRender(book) {
    const div = document.createElement("div");

    const img = `<img src="${book.imageThumb}" title="${book.title}" alt="${book.title}" class="img-fluid" />`;

    const linkToImage = `<a href="${book.imagePath}" target="_blank" class="btn btn-primary" title="View image in High Quality">View HQ </a>`;
    const linkToDelete = `<a href="#" class="btn btn-danger delete" _id="${book._id}"> Delete </a>`;

    div.className = "col-lg-12";
    div.innerHTML = `
            <div class="card card-body mx-0  mb-4">
                <div class="row mb-4 text-center text-md-left">
                    <div class="col-md-4 px-5 px-md-3 mb-3 mb-sm-0">${img}</div>
                    <div class="col-md-8">
                        <h4 class="card-title mt-3 mt-md-0"> ${book.title} </h4>
                        <p class="card-text"> ${book.author} </p>
                        ${linkToDelete}
                        ${linkToImage}
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <small>
                      ${format(book.created_at, "it")}
                    </small>
                    <small class="card-text">
                      <strong>isbn:</strong> ${book.isbn}
                    </small>
                </div>
            </div>
        `;

    return div;
  }

  async renderBooks() {
    const books = await newBook.getBook();
    booksCardContainer.innerHTML = "";
    const booksDiv = books.map(this.cardRender);

    booksDiv.forEach((div) => {
      booksCardContainer.appendChild(div);
    });
  }

  async addNewBook(book) {
    await newBook.postBook(book);
    this.clearForm();
    this.renderBooks();
  }

  clearForm() {
    document.getElementById("book-form").reset();
  }

  successMessage(message, color, time) {
    const div = document.createElement("div");
    div.className = `alert alert-${color} message`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".col-md-5");
    const bookForm = document.querySelector("#book-form");
    container.insertBefore(div, bookForm);

    setTimeout(() => {
      document.querySelector(".message").remove();
    }, time);
  }

  async deleteBook(bookId) {
    await newBook.deleteBook(bookId);
    this.renderBooks();
  }
}

export default UI;
