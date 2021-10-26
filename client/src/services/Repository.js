import Api from './Api'
export default ({
  fetchBooks () {
    return Api().get('books?orderBy=id&direction=ASC')
  },
  deleteBook (id) {
    return Api().delete('books/' + id)
  },
  addBook (data) {
    return Api().post('books', data)
  },
  fetchAuthor (id) {
    return Api().get('authors/' + id)
  },
  fetchAuthors () {
    return Api().get('authors?orderBy=id&direction=ASC&limit=10&page=1')
  },
  deleteAuthor (id) {
    return Api().delete('authors/' + id)
  }
})
