"use strict";

// book class to instantiate new books.
class Book {
    constructor(title, author, numberOfPages) {
        this.id = 0;
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
    }

    getDetails() {
        return `${this.title} is ${this.numberOfPages} long and was written by ${this.author}`;
    }

    static totalPages(book) {
        return book.numberOfPages;
    }
}

// book depot object used to manage the book collection.
var bookDepot = {

    books:[],

    iterator:0,

    generateId:function(){

        this.iterator++;
        return this.iterator;
    },

    getBookById:function(bookId){
        bookId = parseInt(bookId);
        var book = this.books.find(b=>b.id == bookId);
        console.log(`Found ${book.title} by id.`);
        return book;
    },

    addBook:function(book){
        book.id = parseInt(book.id);
        book.id = (book.id == 0) ? this.generateId() : book.id;
        book.numberOfPages = parseInt(book.numberOfPages * 1);
        this.books.push(book);
        this.sort();
        console.log(`${book.title} has been added to the book collection.`);
    },

    updateBook:function(book){
        this.removeBook(book);
        this.addBook(book);
        this.log(book,"has been updated.");
    },

    removeBook:function(book){
        book.id = parseInt(book.id);
        this.books = this.books.filter(obj => obj.id !== book.id);
        console.log(`${book.title} has been removed from the book collection.`);
        this.sort();
    },

    removeBookById:function(bookId){
        bookId = parseInt(bookId);
        var b = this.books.find(item => item.id == bookId);
        this.books = this.books.filter(o => o.id !== b.id);
        console.log(`Book ${bookId} has been deleted by id.`);
        this.sort();
        console.log(this.books);
    },

    sort:function(){
        var sorted = this.books.sort((a,b) => {

            if(a.title < b.title){
                return -1;
            }

            if(a.title > b.title){
                return 1;
            }

            return 0;
        });
        this.books = sorted;
    },

    log:function(book,message){
        console.log(`${book.title} ${message}`);
    }

};