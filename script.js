const container = document.querySelector(".container");
const addBookBtn = document.querySelector(".addBook");
const modal = document.querySelector(".modal");
const form  = document.querySelector("form");

let myLibrary = [];

class Book{
    constructor(title, author, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
    changeReadStatus = (e) => {
        let btn = e.target;
        this.isRead = !this.isRead;
        btn.innerHTML = this.isRead ? "Read" : "Not read";
        btn.classList = [`isRead ${this.isRead}`];
    }
    removeBook = (e) => {
        let bookContainer = e.target.parentNode;
        let index = bookContainer.dataset.number;
        myLibrary.splice(index, 1); 
        bookContainer.remove();
        let books = Array.from(container.querySelectorAll(".book"));
        books.forEach(book => book.dataset.number = `${books.indexOf(book)}`);
    }
    addBookToDOM = () => {
        let bookContainer = document.createElement('div');
        bookContainer.classList.add("book");
        bookContainer.dataset.number = `${myLibrary.indexOf(this)}`;
        let buttonText = this.isRead ? "Read" : "Not read";
        bookContainer.innerHTML = `<p>"${this.title}"</p><p>${this.author}</p><p>${this.pages} pages</p><button class="isRead ${this.isRead}">${buttonText}</button><button class="remove">Remove</button>`;
        container.appendChild(bookContainer);
        bookContainer.querySelector(".isRead").addEventListener("click", this.changeReadStatus);
        bookContainer.querySelector(".remove").addEventListener("click", this.removeBook);
    }
}

class Modal {
    static openModale = () => {
        modal.classList.add("active");
    }
    static hideModal = (e) => {
        if (e.target == modal) modal.classList.remove("active");
    }
    static closeModal = () => {
        modal.classList.remove("active");
        for (let i = 0; i < 3; i++) form.elements[i].value = '';
        form.elements[3].checked = false;
    }
}

const addBookToLibrary = (e) => {
    e.preventDefault();
    let book = new Book(form.elements[0].value, form.elements[1].value, form.elements[2].value, form.elements[3].checked);
    myLibrary.push(book);
    book.addBookToDOM();
    Modal.closeModal();
}

addBookBtn.addEventListener("click", Modal.openModale);
modal.addEventListener("click", Modal.hideModal);
form.addEventListener('submit', addBookToLibrary);

const addBooksManually = (() => {
    myLibrary.push(new Book('Kobzar', 'Taras Shevchenko', '720', true),         
        new Book('Stolen Happiness', 'Ivan Franko', '640', false),
        new Book('The Forest Song', 'Lesya Ukrainka', '384', true),
        new Book('Tiger Trappers', ' Ivan Bahrianyi', '304', true))
    myLibrary.forEach(book => book.addBookToDOM());
})()
