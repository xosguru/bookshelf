 // App Interface

 const markUp = '<header>'
            +'<h1>Bookshelf</h1>'
            +'<h4>built with native Javascript and HTML5</h4>'
            +'</header>'
            +'<p>'
            +'The aim of this project was to test how long it would take to develop a simple app using native browser language features. The conclusion was...too long.'
            +'Javascript libraries coupled with HTML5/CSS templates, while adding to the complexity of the app, can drastically reduce time to completion.'
            +'</p>'
            +'<div class="row">'
            +'<div class="col">'
            +'<fieldset id="new-book-fieldset">'
            +'<legend>Book Details</legend>'
            +'<form>'
            +'<input type="hidden" id="new-book-id" value="0" />'
            +'<label for="new-book-title">Title:</label><input type="text" id="new-book-title" />'
            +'<label for="new-book-author">Author:</label><input type="text" id="new-book-author" />'
            +'<label for="new-book-numberOfPages">Page count:</label><input type="text" id="new-book-numberOfPages" />'
            +'<button id="new-book-form-button" type="submit">Save</button>'
            +'<button id="clear-form" type="reset">Clear</button>'
            +'</form>'
            +'</fieldset>'
            +'</div>'
            +'</div>'
            +'<div class="row">'
            +'<div class="col">'
            +'<div id="book-list">'
            +'<ul id="books"></ul>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>';
 
 
 // bind click event to the button.
 (function(){
    document.getElementById('container').innerHTML = markUp;
    document.getElementById('new-book-form-button').addEventListener('click', function(event){
        saveBook();
        event.preventDefault();
    });

    document.getElementById("clear-form").addEventListener('click',function(event){
        resetForm();
        event.preventDefault();
    })

    // create two instances of a book.
    var bookOne = new Book("Playing to Win", "A.G. Lafley", 260);
    var bookTwo = new Book("Everyday A Friday", "Joel Olsteen", 224);
    
    // add the two books to the depot.
    bookDepot.addBook(bookOne);
    bookDepot.addBook(bookTwo);

    // add a book to the depot.
    bookDepot.addBook(new Book("Her First Bible","Melody Carlson", 91));
    
    updateListDisplay();

    resetForm();
})();

function resetForm(){
var inputs = document.querySelectorAll("input[type='text']");

    // traditional for loop over the collection of elements.
    for(var x = 0, element; element = inputs[x++];){
         element.value = "";
    }
    document.getElementById('new-book-id').value = 0;
    inputs[0].focus();
}

function updateListDisplay() {

    // access the book container
    var bookList = document.getElementById("books");
    
    // clear the existing items
    bookList.innerHTML = "";

    // iterate over books collection and display each title
    for(var x=0; x <= bookDepot.books.length - 1; x++) {

        // iterate through book collection and create the display list.
        var book = bookDepot.books[x];
        var br = document.createElement("br");
        
        // create a list element to hold book details
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(book.title));


        // create link to update the book.
        var a = document.createElement("a")
        a.setAttribute("href","#")
        a.setAttribute("id","u-" + book.id);
        a.setAttribute("data-book-id",book.id);
        a.setAttribute("data-action","update")
        a.textContent = "update";
        li.appendChild(a);
        a.addEventListener("click", function(event){
            updateBook(this.dataset.bookId);
            event.preventDefault();
        });

        // create link to delete the book.
        var a = document.createElement("a")
        a.setAttribute("href","#")
        a.setAttribute("id","d-" + book.id);
        a.setAttribute("data-book-id",book.id);
        a.setAttribute("data-action","delete");
        a.textContent = " delete";
        li.appendChild(a);
        a.addEventListener("click", function(event){
            deleteBook(this.dataset.bookId);
            event.preventDefault();
        });

        // add the book to the list.
        bookList.appendChild(li);
        //bookList.appendChild(br);
    }
}

// function to save a new book from values entered on the page.
function saveBook(){

    // get values from the html input elements.
    let title = document.getElementById('new-book-title').value;
    let author = document.getElementById('new-book-author').value;
    let pages = document.getElementById('new-book-numberOfPages').value;
    let id = parseInt(document.getElementById('new-book-id').value);

    if(id === 0){
        // create a new book using the values and add it to the depot.
        bookDepot.addBook(new Book(title,author,pages));
    } else {
        //update the existing book
        var book = new Book(title,author,pages);
        book.id = id;
        bookDepot.updateBook(book);
    }
    // write the title of the new book to the console.
    console.log(`The new book ${title}, has been added to the depot.`);

    // write the bookDepot object to the console to validate its properties.
    console.log(bookDepot);
    updateListDisplay();

    resetForm();
}

// function to delete a book from the repository
function deleteBook(bookId){
    bookDepot.removeBookById(bookId);
    updateListDisplay();
}

//function to update a book
function updateBook(bookId){

    var book = bookDepot.getBookById(bookId);

     // get values from the html input elements.
    document.getElementById('new-book-title').value = book.title;
    document.getElementById('new-book-author').value = book.author;
    document.getElementById('new-book-numberOfPages').value = book.numberOfPages;
    document.getElementById('new-book-id').value = book.id;
    console.log('book to be updated: ' + book);
}