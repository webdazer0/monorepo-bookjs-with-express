// require('./css/app.css');  --> da ECMA 6 si puo usare importare cosi: *import 'file.ext'*
import "./css/app.css";
import UI from "./UI";

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  ui.renderBooks();
});

document.getElementById("book-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;
  const image = document.getElementById("image").files;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("author", author);
  formData.append("isbn", isbn);
  formData.append("image", image[0]);

  const ui = new UI();
  await ui.addNewBook(formData);
  ui.successMessage("✔️ New book added! ", "success", 3000);
});

document.getElementById("books-cards").addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete")) {
    e.preventDefault();
    // console.log(e.target.getAttribute('_id'));
    const id = e.target.getAttribute("_id");
    const ui = new UI();
    await ui.deleteBook(id);
    ui.successMessage("❌ Book Deleted!", "danger", 3000);
  }
});
