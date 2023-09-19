const myLibrary = [
  { title: "Dark Tower", author: "Stephen King", pages: 453, read: false, id: 0 },
  { title: "Odd Thomas", author: "Dean Koontz", pages: 399, read: false, id: 1 },
  { title: "Sweet Jane", author: "Bob Odenkirk", pages: 836, read: false, id: 2 },
];

function Book(title, author, pages, read=false, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

function addBookToLibrary(book) {
  const container = document.querySelector(".books-container");

  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-id", book.id);
  card.innerHTML = `
        <button class="remove" data-key="${book.id}">&#128473;</button>
        <button class="mark-read">&#10004;</button>
        <div class="card-row">${book.title}</div>
        <div class="card-row">${book.author}</div>
        <div class="card-row">${book.pages} pages</div>
    `;

  container.append(card);

  const removeBtns = Array.from(document.getElementsByClassName("remove"));
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", removeBook);
  });
}

myLibrary.forEach((book) => addBookToLibrary(book));

const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];
const submit = document.getElementById("submitBtn");

const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const pagesInput = document.getElementById("pagesInput");

function getInfo(e) {
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const index = myLibrary.length;

  if (title === "" || author === "" || pages === "") {
    alert("Please fill in all fields");
    return false;
  }

  const inputBook = new Book(title, author, pages, index);
  addBookToLibrary(inputBook);
  e.preventDefault();

  modal.style.display = "none";
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
}

btn.onclick = function () {
  modal.style.display = "block";

  submit.addEventListener("click", getInfo);
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

function removeBook(e) {
  const id = e.target.dataset.key;
  const book = document.querySelector(`[data-id="${id}"]`);

  myLibrary.splice(id, 1);
  book.remove();
}
