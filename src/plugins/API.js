import axios from 'axios'
export default () => {
  return axios.create({

    /*             if you builing live site the please uncommnet the following              */

    // baseURL: '/'

    /*             API base URL for testing locally              */

    baseURL: 'http://localhost:8081/'


  })
}