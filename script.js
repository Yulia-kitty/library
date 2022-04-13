const container = document.querySelector(".container");
const addBookBtn = document.querySelector(".addBook");
const modal = document.querySelector(".modal");
const form  = document.querySelector("form");

let myLibrary = [];
let book = '';

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

const openModale = () => {
    modal.classList.add("active");
}

const hideModal = (e) => {
    if (e.target == modal) modal.classList.remove("active");
}

const closeModal = () => {
    modal.classList.remove("active");
    for (let i = 0; i < 3; i++) form.elements[i].value = '';
    form.elements[3].checked = false;
}

const changeReadStatus = (e) => {
    let btn = e.target;
    let book = myLibrary[btn.parentNode.dataset.number];
    book.isRead = !book.isRead;
    btn.innerHTML = book.isRead ? "Read" : "Not read";
    btn.classList = [`isRead ${book.isRead}`];
}

const removeBook = (e) => {
    let bookContainer = e.target.parentNode;
    let index = bookContainer.dataset.number;
    myLibrary.splice(index, 1); 
    bookContainer.remove();
    let books = Array.from(container.querySelectorAll(".book"));
    books.forEach(book => book.dataset.number = `${books.indexOf(book)}`);
}

const addBookToDOM = (book) => {
    let bookContainer = document.createElement('div');
    bookContainer.classList.add("book");
    bookContainer.dataset.number = `${myLibrary.indexOf(book)}`;
    let buttonText = book.isRead ? "Read" : "Not read";
    bookContainer.innerHTML = `<p>"${book.title}"</p><p>${book.author}</p><p>${book.pages} pages</p><button class="isRead ${book.isRead}">${buttonText}</button><button class="remove">Remove</button>`;
    container.appendChild(bookContainer);
    bookContainer.querySelector(".isRead").addEventListener("click", changeReadStatus);
    bookContainer.querySelector(".remove").addEventListener("click", removeBook);
}

const addBookToLibrary = (e) => {
    e.preventDefault();
    book = new Book(form.elements[0].value, form.elements[1].value, form.elements[2].value, form.elements[3].checked);
    myLibrary.push(book);
    addBookToDOM(book);
    closeModal();
}

addBookBtn.addEventListener("click", openModale);
modal.addEventListener("click", hideModal);
form.addEventListener('submit', addBookToLibrary);

const addBooksManually = () => {
    myLibrary.push(new Book('Kobzar', 'Taras Shevchenko', '720', true),         
        new Book('Stolen Happiness', 'Ivan Franko', '640', false),
        new Book('The Forest Song', 'Lesya Ukrainka', '384', true),
        new Book('Tiger Trappers', ' Ivan Bahrianyi', '304', true))
    myLibrary.forEach(book => addBookToDOM(book));
}
addBooksManually();
