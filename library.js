
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
// let myLibrary =   [
//     new Book("Sømannen", "Jo Nesbø", 251, false),
//     new Book("Rødstrupe", "Jo Nesbø", 492, true),
//     new Book("Berlinerpopplene", "Anne B. Ragde", 379, true),
//     new Book("Lord of the Rings", "J. R. R. Tolkien", 150, true),
//     new Book("Donald Duck", "Don Rosa", 1211, true)
// ]
 



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

class Library {
    constructor(...books) {
        this.books = books
    }
    logBooks() {
        this.books.forEach(book => console.log(book))
    }
    addBookToLibrary(newBook) {
        console.log(newBook)
        this.books.push(newBook)
    }
    
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
    toggleRead() {
        this.read  = !this.read
    }
}

let myLibrary = new Library(
    new Book("Sømannen", "Jo Nesbø", 251, false),
    new Book("Rødstrupe", "Jo Nesbø", 492, true),
    new Book("Berlinerpopplene", "Anne B. Ragde", 379, true),
    new Book("Lord of the Rings", "J. R. R. Tolkien", 150, true),
    new Book("Donald Duck", "Don Rosa", 1211, true)
)

function setLibrary() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
} 
function getLibrary(){
    let loadedLibrary = JSON.parse(localStorage.getItem("myLibrary"))
    loadedLibrary.__proto__ = new Library()
    loadedLibrary.books.forEach(book => Object.setPrototypeOf(book, new Book) )
    return loadedLibrary
}


if(!localStorage.getItem("myLibrary")) { 
    
    setLibrary()
    console.log("ppop")
} else {
    console.log("YEY")
    myLibrary = getLibrary()
}




class UI {

    
    static container = () => document.querySelector(".container")

    static randomColor() {
        return Math.floor(Math.random() * 255)   
    }

    static refreshID() {
        document.querySelectorAll(".card").forEach((div, i) => {
            div.setAttribute("delete-id", i )
        })
    }
    
    static displayAllBooks() {
        this.container().textContent = ""
        myLibrary.books.forEach(book => {
            this.createBookCard(book.title, book.author, book.pages, book.read)
            
        })
    }

    static createBookCard(title, author, pages, read) {
        function createElementAddClassAddContent(element, className, content) {
            let temp = document.createElement(element)
            temp.classList.add(className)
            if(content) temp.innerText = content
            return temp
        }
        function createButtons(id, content) {
            let temp = document.createElement("div")
            temp.id = id
            temp.innerText = content
            temp.setAttribute("data-id", myLibrary.books.findIndex(book => book.title == title))
            return temp
        }
        const divElement = createElementAddClassAddContent("div", "card")
        const titleElement = createElementAddClassAddContent("h2", "title", title)
        const authorElement = createElementAddClassAddContent("h3", "author", author)
        const pagesElement = createElementAddClassAddContent("h4", "pages", pages + " pages")
        const readElement = createElementAddClassAddContent("h4", "read", read ? "Book is: Read" : "Book is: Not read")

        const topDiv = document.createElement("div")
        topDiv.id = "topDiv"

        const deleteButton  = createButtons("delete-btn", " X")
        // const delBtn = document.createElement("div")
        // delBtn.id = "delBtn"
        // delBtn.textContent = "x"
        // div.setAttribute("delete-id", myLibrary.findIndex(book => book.title == titleBook)) 
        
        const readButton = createButtons("read-btn", read ? "Read" : "Not Read")
        // const readBtn = document.createElement("div")
        // readBtn.id = "readBtn"
        // readBtn.textContent = readBook ? "Read" : "Not read";
        // readBtn.setAttribute("read-id", myLibrary.findIndex(book => book.title == titleBook)) 
        //console.log(readButton)
        topDiv.appendChild(readButton)
        topDiv.appendChild(deleteButton)
        divElement.append(topDiv)

        deleteButton.addEventListener("click", e => {
            let index = e.target.attributes["data-id"].value
            myLibrary.books.splice(index, 1)
            setLibrary()
            e.target.parentElement.parentElement.remove()
            this.refreshID()
        })
        readButton.addEventListener("click", (e) => {
            let index = e.target.attributes["data-id"].value
            myLibrary.books[index].toggleRead();
            readElement.innerText  =  `Book is:  ${myLibrary.books[index].read ? "Read" : "Not Read"}`
            setLibrary()
            readButton.textContent = myLibrary.books[index].read ? "Read" : "Not Read"
        })
        divElement.append(titleElement, authorElement, pagesElement, readElement)
        divElement.style.backgroundColor = `rgba(${UI.randomColor()}, ${UI.randomColor()}, ${UI.randomColor()}, 1)`
        this.container().appendChild(divElement)


    }

    static setUpForm() {
        const formBtn = document.querySelector("#form-btn")
        const form = document.querySelector("form")
        form.style.display = "none"
        formBtn.addEventListener("click", ()=> {
            form.style.display == "none" ? form.style.display = "block" : form.style.display = "none"
        })

        const submit = document.querySelector("input[type='submit']")
        submit.addEventListener("click", e => {
                    e.preventDefault()

                    let form = e.target.parentElement
                    let title = form[0].value
                    let author = form[1].value
                    let pages =  form[2].value
                    let reada =  form[3].checked
                    let book = new Book(title, author, pages, reada)
                    myLibrary.addBookToLibrary(book)
                    setLibrary()
                    this.createBookCard(book.title, book.author, book.pages, book.read)
                    this.refreshID()
                })
    }
}



// Stupid me thought i had to generate form using JS. New approach is to make in HTML and hide it. Bring it out with JKS
// function createForm() {
//     const titleLabel = document.createElement("label")
//     titleLabel.setAttribute("for", "title")
//     titleLabel.innerText = "Title"
//     const titleInput  = document.createElement("input")
//     titleInput.setAttribute("type", "text")
//     titleInput.id = "title"

//     const authorLabel = document.createElement("label")
//     authorLabel.setAttribute("for", "author")
//     authorLabel.innerText = "Author"
//     const authorInput  = document.createElement("input")
//     authorInput.setAttribute("type", "text")
//     authorInput.id = "author"


//     const pagesLabel = document.createElement("label")
//     pagesLabel.setAttribute("for", "author")
//     pagesLabel.innerText = "Number of Pages"
//     const pagesInput  = document.createElement("input")
//     pagesInput.setAttribute("type", "number")
//     pagesInput.id = "pages"

//     const readLabel = document.createElement("label")
//     readLabel.setAttribute("for", "author")
//     readLabel.innerText = "Have you read the book?"
//     const readInput  = document.createElement("input")
//     readInput.setAttribute("type", "checkbox")
//     readInput.id = "read"

//     const submit = document.createElement("input")
//     submit.setAttribute("type", "submit")
//     submit.setAttribute("value", "Submit")
    

//     form.append(titleLabel, titleInput, authorLabel, authorInput, pagesLabel, pagesInput, readLabel, readInput)
//     form.append(submit)
//     body.append(form)

//     submit.addEventListener("click", e => {
//         e.preventDefault()
//         let book = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked)
//         addBookToLibrary(book)
        
//         createBookCard(book.title, book.author, book.pages, book.read)
//     })

// }


UI.setUpForm()
UI.displayAllBooks()




