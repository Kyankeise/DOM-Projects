// Author: Kyan Keise
// Date:
// Title: 

// JavaScript ES6


// Book Contructor

function Book(title, author, isbn) {

    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI Constructor

function UI() { }

// Add book to list
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    // create tr element 
    const row = document.createElement('tr');

    // instert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href= "#" class="delete">X<a></td>
    `;
    list.appendChild(row);

}

// Clear fields

UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Show Alert

UI.prototype.showAlert = function (message, className) {
    // create div

    const div = document.createElement('div');
    // add classes
    div.className = `alert ${className}`;

    // add text
    div.appendChild(document.createTextNode(message));
    // get parent 
    const container = document.querySelector('.container');
    // get form
    const form = document.querySelector('#book-form');

    // insert alert
    container.insertBefore(div, form);

    // timeout after 3 secs

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}

// Delete book

UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();

    }
}


// Event listeners for add books

document.getElementById('book-form').addEventListener('submit', function (e) {

    // Get form values

    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;



    // Instantiate book

    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate 
    if (title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to the list
        ui.addBookToList(book);

        // Show success
        ui.showAlert('Book added!', 'success');

        // Clear fields
        ui.clearFields();

    }

    e.preventDefault();
});


// Event listner for deleete

document.getElementById('book-list').addEventListener('click', function (e) {

    // Instantiate UI
    const ui = new UI();

    ui.deleteBook(e.target);

    // Show message
    ui.showAlert('Book Removed', 'success');
    e.preventDefault();
});