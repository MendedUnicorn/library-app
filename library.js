
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

let myLibrary = [
    new Book("Sømannen", "Jo Nesbø", 251, false),
    new Book("Rødstrupe", "Jo Nesbø", 492, true),
    new Book("Berlinerpopplene", "Anne B. Ragde", 379, true),
    new Book("Lord of the Rings", "J. R. R. Tolkien", 150, true),
    new Book("Donald Duck", "Don Rosa", 1211, true)
] 

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}
function randomColor() {
    return randomNumber = Math.floor(Math.random() * 255)
    
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

Book.prototype.toggleRead = function() {
    this.read = !this.read
}

function refreshID() {
    document.querySelectorAll(".card").forEach((div, i) => {
        div.setAttribute("delete-id", i )
    })
}

const body = document.querySelector("body")
const container = document.querySelector(".container")

function createBookCard(titleBook, authorBook, pagesBook, readBook) {
    const div = document.createElement("div")
    div.classList.add("card")
    const title = document.createElement("h2")
    title.classList.add("title")
    title.innerText = titleBook
    const author = document.createElement("h3")
    author.classList.add("author")
    author.innerText = authorBook
    const pages = document.createElement("h4")
    pages.classList.add("pages")
    pages.innerText = pagesBook + " pages"
    const read = document.createElement("h4")
    read.classList.add("read")
    read.innerText = readBook ? "Book has been read" : "Book has not been read"

    const topDiv = document.createElement("div")
    topDiv.id = "topDiv"

    const delBtn = document.createElement("div")
    delBtn.id = "delBtn"
    delBtn.textContent = "x"
    div.setAttribute("delete-id", myLibrary.findIndex(book => book.title == titleBook)) 
    topDiv.appendChild(delBtn)
    
    const readBtn = document.createElement("div")
    readBtn.id = "readBtn"
    readBtn.textContent = readBook ? "Read" : "Not read";
    readBtn.setAttribute("read-id", myLibrary.findIndex(book => book.title == titleBook)) 

    topDiv.appendChild(readBtn)
    topDiv.appendChild(delBtn)
    
    
    div.append(topDiv)


    //delete btn
    

    




    //delete book
    delBtn.addEventListener("click", e => {
        console.log(e.target.parentElement.parentElement.attributes["delete-id"].value)
        let index = e.target.parentElement.parentElement.attributes["delete-id"].value
        myLibrary.splice(index, 1)
        
        e.target.parentElement.parentElement.remove()
        console.log(e.target.parentElement.parentElement)
        let leftOverDivs = e.target.parentElement.parentElement
        console.log(leftOverDivs)
        refreshID()
        
        })

    readBtn.addEventListener("click", (e) => {
        // let title = e.target.parentElement.parentElement.childNodes[1].textContent
        // let index = myLibrary.findIndex(book => book.title === title)
        // myLibrary[index].read = !myLibrary[index].read
        // readBtn.textContent = myLibrary[index].read ? "Read" : "Not Read"
        console.log(e.target)

    })


    div.append(title, author, pages, read)
    div.style.backgroundColor = `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 1)`

    container.appendChild(div)

}
function printLibrary() {myLibrary.forEach(book => console.log(book.title))}

function displayAllBooks() {
    container.textContent = ""
    myLibrary.forEach(book => {
        createBookCard(book.title, book.author, book.pages, book.read)
        
    })
}

const formBtn = document.querySelector("#form-btn")
const form = document.createElement("form")
form.classList.add("form")

const submit = document.querySelector("input[type='submit']")
submit.addEventListener("click", e => {
            e.preventDefault()
            let form = e.target.parentElement
            let title = form[0].value
            let author = form[1].value
            let pages =  form[2].value
            let reada =  form[3].checked
            let book = new Book(title, author, pages, reada)
            addBookToLibrary(book)
            createBookCard(book.title, book.author, book.pages, book.read)
            refreshID()
            
            //createBookCard(book.title, book.author, book.pages, book.read)
        })


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



displayAllBooks()




