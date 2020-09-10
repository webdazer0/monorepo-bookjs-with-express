import BookService from './services/BookService';
import { format } from 'timeago.js';
require('./addLang'); // Aggiunge lingue: Italiano & Spagnolo
const newBook = new BookService();

class UI {

    async renderBooks() {
       const books = await newBook.getBook();
        const booksCardContainer = document.getElementById('books-cards');
        booksCardContainer.innerHTML = '';
        books.forEach(book => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
                <div class="card card-body mx-4 mb-4">
                    <div class="row mb-4">
                        <div class="col-md-4">
                            <img src="${book.imagePath}" alt="${book.title}" class="img-fluid" />
                        </div>
                        <div class="col-md-8">
                            <h4 class="card-title">${book.title}</h4>
                            <p class="card-text">${book.author}</p>
                            <a href="#" class="btn btn-danger delete" _id="${book._id}">Delete</a>
                        </div>
                    </div>
                    <div class="card-footer">
                        ${format(book.created_at, 'it')}
                    </div>
                </div>
            `;
            booksCardContainer.appendChild(div);
        });
    }

    async addNewBook(book) {
        await newBook.postBook(book);
        this.clearForm();
        this.renderBooks();
    }

    clearForm() {
        document.getElementById('book-form').reset();
    }

    successMessage(message, color, time) {
        const div = document.createElement('div');
        div.className = `alert alert-${color} message`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');
        container.insertBefore(div, bookForm);

        setTimeout(() => {
            document.querySelector('.message').remove();
        }, time);
    }

    async deleteBook(bookId) {
        await newBook.deleteBook(bookId);
        this.renderBooks();
    }

}

export default UI;