let books = []
let editId = null

function render() {
  const list = $("#bookList")
  list.empty()

  books.forEach(book => {
    const li = $(`
      <li>
        <span>${book.title} - ${book.author} (${book.year})</span>
        <div class="actions">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>
      </li>
    `)

    li.find(".edit").click(() => startEdit(book.id))
    li.find(".delete").click(() => deleteBook(book.id))

    list.append(li)
  })
}

function clearInputs() {
  $("#title").val("")
  $("#author").val("")
  $("#year").val("")
}

function addOrUpdateBook() {
  const title = $("#title").val().trim()
  const author = $("#author").val().trim()
  const year = $("#year").val().trim()

  if (!title || !author || !year) return

  if (editId) {
    books = books.map(b => b.id === editId ? { ...b, title, author, year } : b)
    editId = null
  } else {
    books.push({ id: Date.now(), title, author, year })
  }

  clearInputs()
  render()
}

function deleteBook(id) {
  books = books.filter(b => b.id !== id)
  render()
}

function startEdit(id) {
  const book = books.find(b => b.id === id)
  if (!book) return

  $("#title").val(book.title)
  $("#author").val(book.author)
  $("#year").val(book.year)

  editId = id
}

$(document).ready(() => {
  $("#addBtn").click(addOrUpdateBook)
  render()
})
