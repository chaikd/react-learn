import { getToken, removeToken } from '@/utils/token'
import axios from 'axios'
import router from '@/routers/routes';

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
  return res.data
}, err => {
  if(err.response.state === 401) {
    removeToken()
    router.navigate('/login')
  }
})

export default request