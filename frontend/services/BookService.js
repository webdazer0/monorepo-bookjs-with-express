import setup from "../setup";

class BookService {
  constructor() {
    this.URI = setup.API_URI;
  }

  async getBook() {
    const response = await fetch(this.URI);
    const books = await response.json();
    return books;
  }
  async postBook(book) {
    const response = await fetch(this.URI, {
      method: "POST",
      body: book,
    });
    const data = await response.json();
    console.log(data);
  }
  async deleteBook(bookId) {
    const response = await fetch(`${this.URI}/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }
}

export default BookService;
