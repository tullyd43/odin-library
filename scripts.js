const myLibrary = [];
function Book(title, author, pages, read, date, isbn) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.date = date;
  this.isbn = isbn;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  book.index = myLibrary.indexOf(book);
}

let addBook = document
  .querySelector("#add-new-book")
  .addEventListener("click", () => {
    let modal = document.querySelector(".modal");
    modal.showModal();
  });

function closeModal() {
  let modal = document.querySelector(".modal");
  let form = document.querySelector(".form");
  form.reset();
  modal.close();
}

let cancel = document
  .querySelector("#cancel")
  .addEventListener("click", closeModal);

const form = document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const bookData = Object.fromEntries(formData.entries());
  let newBook = new Book(
    bookData.title,
    bookData.author,
    bookData.pages,
    bookData.read,
    bookData.date,
    bookData.isbn
  );
  e.target.reset();
  addBookToLibrary(newBook);
  displayBook(myLibrary[myLibrary.length - 1]);
  closeModal();
});

function displayBook(lastBook) {
  let book = lastBook;
  let table = document.querySelector(".table");
  let newRow = table.insertRow(-1);
  let title = newRow.insertCell(0);
  let bookTitle = document.createTextNode(book.title);
  title.appendChild(bookTitle);
  let author = newRow.insertCell(1);
  let authorName = document.createTextNode(book.author);
  author.appendChild(authorName);
  let pages = newRow.insertCell(2);
  let pageNum = document.createTextNode(book.pages);
  pages.appendChild(pageNum);
  let read = newRow.insertCell(3);
  read.setAttribute("id", "read-status");
  let readStatus = document.createTextNode(book.read);
  read.appendChild(readStatus);
  let date = newRow.insertCell(4);
  let publishDate = document.createTextNode(book.date);
  date.appendChild(publishDate);
  let isbn = newRow.insertCell(5);
  let isbnNum = document.createTextNode(book.isbn);
  isbn.appendChild(isbnNum);
  let readBtnCell = newRow.insertCell(6);
  let readBtn = document.createElement("button");
  readBtn.setAttribute("id", "readYet");
  readBtn.appendChild(document.createTextNode("Change Read Status"));
  readBtnCell.appendChild(readBtn);
  readBtn.addEventListener("click", () => {
    let readStatus = newRow.querySelector("#read-status");
    if (book.read === "Yes") {
      book.read = "No";
    } else if (book.read === "No") {
      book.read = "Yes";
    }
    readStatus.innerText = book.read;
  });

  let remove = document.createElement("button");
  remove.appendChild(document.createTextNode("Remove from Library"));
  readBtnCell.appendChild(remove);
  remove.addEventListener("click", () => {
    myLibrary.splice(book.index, 1);
    let currentIndex = book.index;
    updateIndex(currentIndex);
    table.deleteRow(newRow.rowIndex);
  });
}

function updateIndex(currentIndex) {
  myLibrary.forEach((book) => {
    if (currentIndex <= book.index) {
      book.index = book.index - 1;
    }
  });
}
