import { getToken } from '@/utils/token'
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3004',
  timeout: 6000,
})

request.interceptors.request.use((req) => {
  let token = getToken()
  req.headers.Authorization = token
  return req
}, (err) => {
  return Promise.reject(err)
})

request.interceptors.response.use((res) => {
  // if(res.status === 404) {
  //   navigate('/404')
  // }
  return res
})

export default request