let myLibrary = [
  new Book('Harry Potter', 'JK Rowling', 200, 200)
];

const addButton = document.querySelector('.content-action-add');

addButton.addEventListener('click', () => addBookToLibraryModal());

/*add genre as a bonus*/ 
function Book(title, author, pages, publishYear, read = false) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.publishYear = publishYear;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibraryModal(){
  const bodyRef = document.querySelector('body');
  bodyRef.classList.add('stop-scrolling');
  const bodyRefDivModal = document.createElement('div');
  bodyRefDivModal.classList.add('add-modal-container');
  const modalHTML = 
  `
  <div class = "add-modal">
    <div class = "add-title">
      <p>Add Book</p>
    </div>

    <div class = "add-input">
      <div class = "input-field">
        <p>Title</p>
        <input class = "title-input" type = "text" required>
      </div>

      <div class = "input-field">
        <p>Author</p>
        <input class = "author-input" type = "text" required>
      </div>

      <div class = "input-field">
        <p>Pages</p>
        <input class = "pages-input" type = "number" min = "0" required>
      </div>

      <div class = "input-field">
        <p>Publish Year</p>
        <input class = "publish-year-input" type = "text" type = "number" min = "0" required>
      </div>
    </div>
    <div>
      <button class = "modal-add-book-button" >Add</button>
      <button class = "modal-cancel-book-button">Cancel</button>
    </div>
  </div>
  `;
  bodyRefDivModal.innerHTML = modalHTML;
  bodyRef.appendChild(bodyRefDivModal);

  const addButtonRef = document.querySelector('.modal-add-book-button');
  const cancelButtonRef = document.querySelector('.modal-cancel-book-button');

  // Cancel action

  cancelButtonRef.addEventListener('click', () => removeModal());

  // Add action

  addButtonRef.addEventListener('click', () => {
    const titleInputRef = document.querySelector('.title-input');
    const authorInputRef = document.querySelector('.author-input');
    const pagesInputRef = document.querySelector('.pages-input');
    const publishYearInputRef = document.querySelector('.publish-year-input');

    if (!titleInputRef.value){
      alert('Title input blank!');
    }
    else if (!authorInputRef.value){
      alert('Author input blank!');
    }
    else if (!pagesInputRef.value){
      alert('Pages input blank!');
    }
    else if (!publishYearInputRef.value){
      alert('Publishing year input blank!');
    }
    else{
      removeModal();
      const newBook = new Book(titleInputRef.value, authorInputRef.value, pagesInputRef.value, publishYearInputRef.value);
      addBookToLibrary(newBook);
    }
  })
}


function removeModal(){
  const modalRef = document.querySelector('.add-modal-container');
  modalRef.remove();
}

function addBookToLibrary(newBook) {
  // take params, create a book then store it in the array
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const contentGridRef = document.querySelector('.content-grid');
  contentGridRef.innerHTML = '';
  for (let personBook of myLibrary){
    const newCard = document.createElement('div');
    newCard.classList.add('outerCardClass');
    newCard.classList.add(`card-${personBook.id}`);
    // Outer div -> not 
    const newCardHTML =
    `
    <div class = "card">
      <div class = "title-${personBook.id}">
        ${personBook.title}
      </div>

      <div class = "info-${personBook.id}">
        <div class = "author-${personBook.id}">
          <p>Author: ${personBook.author}</p>
        </div>

        <div class = "pages-${personBook.id}">
          <p>Pages: ${personBook.pages}</p>
        </div>

        <div class = "publishing-year-${personBook.id}">
          <p>Publishing Year: ${personBook.publishYear}</p>
        </div>
      </div>

      <div class = "card-buttons-${personBook.id}">
        <button class = "read-status-${personBook.id} ${personBook.read ? 'read' : 'unread'}">${personBook.read ? '<img src = ./svg/book-open-blank-variant-outline.svg>' : '<img src = ./svg/book.svg>'}${personBook.read ? 'READ' : 'UNREAD'}</button>
      </div>

      <button class = "cancel-button-${personBook.id} cancel-button"><img src = ./svg/close-sm-svgrepo-com.svg></button>
    </div>
    `;
    newCard.innerHTML = newCardHTML;
    contentGridRef.append(newCard);

    const readButtonRef = document.querySelector(`.read-status-${personBook.id}`);
    readButtonRef.addEventListener('click', () => {
      personBook.read = !personBook.read;
      displayBooks();
    });

    const cancelButtonRef = document.querySelector(`.cancel-button-${personBook.id}`);
    cancelButtonRef.addEventListener('click', () => {
      myLibrary = myLibrary.filter(deleteBook => deleteBook.id !== personBook.id);
      displayBooks();
    });
  }
}

displayBooks();