import './style.css';

// let myLibrary = [
//     { new Book()
//         title: "Snømannen",
//         author: "Jo Nesbø",
//         pages:  223,
//         read: false
//     },
//     {
//         title: "Rødstrupe",
//         author: "Jo Nesbø",
//         pages:  423,
//         read: true
//     },

// {
//         title: "Berlinerpopplene",
//         author: "Anne B. Ragde",
//         pages:  364,
//         read: false
//     },

// {
//         title: "Lord of the Rings",
//         author: "J. R. R. Tolkien",
//         pages:  754,
//         read: true
//     },

// ];
// localStorage.clear()

import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA4XhaD9E0WB4jVDgBP44ydP9LdjFmoO9c',
  authDomain: 'library-app-dffa6.firebaseapp.com',
  projectId: 'library-app-dffa6',
  storageBucket: 'library-app-dffa6.appspot.com',
  messagingSenderId: '134481844140',
  appId: '1:134481844140:web:a87817944027cb9f710c09',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addBookToDb(book) {
  try {
    const docRef = await addDoc(collection(db, 'library'), {
      title: book.title,
      pages: book.pages,
      author: book.author,
      read: book.read,
      timestamp: serverTimestamp(),
    });
    console.log('Book written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}
//Data converter to convert the database data back to book objects
const libraryConverter = {
  toFirestore: (book) => {
    return {
      title: book.title,
      author: book.author,
      pages: book.pages,
      read: book.read,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Book(data.title, data.author, data.pages, data.read);
  },
};

async function getBooks(db) {
  try {
    const libraryRef = collection(db, 'library').withConverter(
      libraryConverter
    ); //create a reference to the library collection
    const q = query(libraryRef, orderBy('timestamp')); //create a query with the library reference
    const librarySnapshot = await getDocs(q);
    const bookList = librarySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return bookList;
  } catch (error) {
    console.log('Could not retrieve library from database: ', error);
  }
}

let myLibrary = getBooks(db);

// let myLibrary = [
//   new Book('Sømannen', 'Jo Nesbø', 251, false),
//   new Book('Rødstrupe', 'Jo Nesbø', 492, true),
//   new Book('Berlinerpopplene', 'Anne B. Ragde', 379, true),
//   new Book('Lord of the Rings', 'J. R. R. Tolkien', 150, true),
//   new Book('Donald Duck', 'Don Rosa', 1211, true),
// ];

// let myLibrary = (() => {
//   let lib = getBooks(db);
//   return lib;
// })();
// console.log('library', myLibrary);

// function setLibrary() {
//   localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
// }
// function getLibrary() {
//   let loadedLibrary = JSON.parse(localStorage.getItem('myLibrary'));
//   loadedLibrary.forEach((book) => (book.__proto__ = new Book()));
//   return loadedLibrary;
// }

// if (!localStorage.getItem('myLibrary')) {
//   setLibrary();
//   console.log('ppop');
// } else {
//   console.log('YEY');
//   myLibrary = getLibrary();
// }

// let myLibrary = [
//     new Book("Sømannen", "Jo Nesbø", 251, false),
//     new Book("Rødstrupe", "Jo Nesbø", 492, true),
//     new Book("Berlinerpopplene", "Anne B. Ragde", 379, true),
//     new Book("Lord of the Rings", "J. R. R. Tolkien", 150, true),
//     new Book("Donald Duck", "Don Rosa", 1211, true)
// ]
// console.log(localStorage.setItem("myLibrary", myLibrary))
// console.log(localStorage)
// console.dir(localStorage.getItem("myLibrary"))

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
}
function randomColor() {
  return Math.floor(Math.random() * 255);
}

function addBookToLibrary(book) {
  addBookToDb(book);
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function refreshID() {
  document.querySelectorAll('.card').forEach((div, i) => {
    div.setAttribute('delete-id', i);
  });
}

const body = document.querySelector('body');
const container = document.querySelector('.container');

function createBookCard(book) {
  const div = document.createElement('div');
  div.classList.add('card');
  const title = document.createElement('h2');
  title.classList.add('title');
  title.innerText = book.title;
  const author = document.createElement('h3');
  author.classList.add('author');
  author.innerText = book.author;
  const pages = document.createElement('h4');
  pages.classList.add('pages');
  pages.innerText = book.pages + ' pages';
  const read = document.createElement('h4');
  read.classList.add('read');
  read.innerText = book.read ? 'Book is: read' : 'Book is: Not read';

  const topDiv = document.createElement('div');
  topDiv.id = 'topDiv';

  const delBtn = document.createElement('div');
  delBtn.id = 'delBtn';
  delBtn.textContent = 'x';
  let index;
  div.setAttribute('delete-id', book.id);
  topDiv.appendChild(delBtn);

  const readBtn = document.createElement('div');
  readBtn.id = 'readBtn';
  readBtn.textContent = book.read ? 'Read' : 'Not read';
  readBtn.setAttribute('read-id', book.id);

  topDiv.appendChild(readBtn);
  topDiv.appendChild(delBtn);

  div.append(topDiv);

  async function deleteBook(id) {
    const libraryRef = doc(db, 'library', id); // find  document in collection library with document name: id
    await deleteDoc(libraryRef); //delete this document
  }
  async function toggleBookRead(id) {
    const libraryRef = doc(db, 'library', id).withConverter(libraryConverter);
    // await updateDoc(libraryRef, {
    //   read: !read,
    // });
    let bookSnap = await getDoc(libraryRef);
    const book = bookSnap.data();
    console.log('before ', book);
    book.toggleRead();

    console.log('after ', book);
    await updateDoc(libraryRef, { ...book });
  }
  async function getBook(id) {
    const libraryRef = doc(db, 'library', id);
    const bookSnap = await getDoc(libraryRef);

    if (bookSnap.exists()) {
      book = bookSnap.data();
    } else {
      console.log('Could not find book.');
    }
    console.log(book);
    return book;
  }

  //getBook('AtrqLYCLi9ZPnV4bujFX');
  //delete book
  delBtn.addEventListener('click', async (e) => {
    const id =
      e.target.parentElement.parentElement.attributes['delete-id'].value;

    // let index =
    //   e.target.parentElement.parentElement.attributes['delete-id'].value;
    // myLibrary.splice(index, 1);
    // //setLibrary(); ADD firebase
    // e.target.parentElement.parentElement.remove();
    // let leftOverDivs = e.target.parentElement.parentElement;
    // refreshID();
    await deleteBook(id);
    //4\getBook(id)
    displayAllBooks();
  });

  //togle read
  readBtn.addEventListener('click', async (e) => {
    const id =
      e.target.parentElement.parentElement.attributes['delete-id'].value;
    await toggleBookRead(id);
    displayAllBooks();
  });

  div.append(title, author, pages, read);
  //div.style.backgroundColor = `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 1)`;

  container.appendChild(div);
}
function printLibrary() {
  myLibrary.forEach((book) => console.log(book.title));
}

async function displayAllBooks() {
  let books = await getBooks(db);
  container.textContent = '';
  books.forEach((book, i) => {
    createBookCard(book);
  });
}

const formBtn = document.querySelector('#form-btn');
const formEl = document.querySelector('form');
formEl.style.display = 'none';
formBtn.addEventListener('click', () => {
  formEl.style.display == 'none'
    ? (formEl.style.display = 'block')
    : (formEl.style.display = 'none');
});

const submit = document.querySelector("button[type='submit']");
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');

submit.addEventListener('click', (e) => {
  if (inputTitle.validity.tooShort) {
    inputTitle.setCustomValidity('Come on it needs to be longer dude');
  } else {
    inputTitle.setCustomValidity('');
  }

  if (inputAuthor.validity.tooShort) {
    inputAuthor.setCustomValidity(
      'The Authors name is longer than that buddy!'
    );
  } else {
    inputAuthor.setCustomValidity('');
  }
});

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  let form = e.target;
  let title = form[0].value;
  let author = form[1].value;
  let pages = form[2].value;
  let reada = form[3].checked;
  let book = new Book(title, author, pages, reada);
  addBookToLibrary(book);
  displayAllBooks();
  createBookCard(book);
  refreshID();
});

displayAllBooks();
