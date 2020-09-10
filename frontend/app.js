// require('./css/app.css');  --> da ECMA 6 si puo usare importare cosi: *import 'file.ext'*
import './css/app.css';
import UI from './UI';

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderBooks();
});

document.getElementById('book-form')
    .addEventListener('submit', e => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;
        const image = document.getElementById('image').files;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('isbn', isbn);
        formData.append('image', image[0]);

        const ui = new UI();
        ui.addNewBook(formData);
        ui.successMessage('✔️ New book added! ', 'success', 3000);
    });

document.getElementById('books-cards')
    .addEventListener('click', e => {
        if(e.target.classList.contains('delete')) {
            // console.log(e.target.getAttribute('_id'));
            const id = e.target.getAttribute('_id');
            const ui = new UI();
            ui.deleteBook(id);
            ui.successMessage('❌ Book Deleted!', 'danger', 3000);
        }
        e.preventDefault();
    });