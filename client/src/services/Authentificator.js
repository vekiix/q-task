import Api from './Api'
export default ({
  login (credentials) {
    return Api().post('token', credentials)
  }
})
