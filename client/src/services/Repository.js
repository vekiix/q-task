import Api from './Api'
export default ({
  fetchBooks () {
    return Api().get('books?orderBy=id&direction=ASC')
  },
  deleteBook (id) {
    return Api().delete('books/' + id)
  }
})
