import UI from "./UI";
import { _AUTHOR, _IMAGE, _ISBN, _TITLE } from "./ui.constants";
import { Validator } from "./utils";
//
const inputTitle = document.getElementById(_TITLE);
const inputAuthor = document.getElementById(_AUTHOR);
const inputIsbn = document.getElementById(_ISBN);
const inputImage = document.getElementById(_IMAGE);

const renderBooks = () => {
  const ui = new UI();
  ui.renderBooks();
};

const addNewBook = async (e) => {
  e.preventDefault();
  const ui = new UI();

  try {
    const title = Validator.string(inputTitle);
    const author = Validator.string(inputAuthor);
    const isbn = Validator.number(inputIsbn);
    const image = inputImage.files;

    const formData = new FormData();
    formData.append(_TITLE, title);
    formData.append(_AUTHOR, author);
    formData.append(_ISBN, isbn);
    formData.append(_IMAGE, image[0]);

    console.log(formData);
    await ui.addNewBook(formData);
    ui.successMessage("✔️ New book added! ", "success", 3000);
  } catch (error) {
    ui.successMessage(`${error.message}`, "danger", 3000);
  }
};

const deleteBook = async (e) => {
  if (!e.target.classList.contains("delete")) return;
  e.preventDefault();
  const ui = new UI();

  try {
    const id = e.target.getAttribute("_id");
    await ui.deleteBook(id);
    ui.successMessage("❌ Book Deleted!", "success", 3000);
  } catch (error) {
    ui.successMessage(`${error.message}`, "danger", 3000);
  }
};

export default { renderBooks, addNewBook, deleteBook };
