import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://symfony-skeleton.q-tests.com/api/v2/'
  })
}
