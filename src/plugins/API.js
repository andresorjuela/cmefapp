import axios from 'axios'
export default() => {
  return axios.create({
    baseURL:'/'
    // baseURL:'http://localhost:8081/'
  })
}