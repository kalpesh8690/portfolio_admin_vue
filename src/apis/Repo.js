// Repository.js
import axios from 'axios'

const baseURL = process.env.VUE_APP_API_URL

const Repository = axios.create({
  baseURL,
  timeout: 10000, // Adjust the timeout value as per your requirement
  headers: {
    authorization: localStorage.getItem('token'),
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor
Repository.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
Repository.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  },
)

export default Repository
