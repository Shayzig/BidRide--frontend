import Axios, { AxiosError, AxiosResponse } from 'axios'
// import { router } from '@/router'

// const BASE_URL = process.env['NODE_ENV'] === 'production'
//   ? '/api/'
//   : '//localhost:4200/api/'
const BASE_URL = '//127.0.0.1:4200/api/'


const axios = Axios.create({
  withCredentials: true
})

export const httpService = {
  get(endpoint: any, data?: null | undefined) {
    return ajax(endpoint, 'GET', data)
  },
  post(endpoint: any, data?: null | undefined) {
    return ajax(endpoint, 'POST', data)
  },
  put(endpoint: any, data?: null | undefined) {
    return ajax(endpoint, 'PUT', data)
  },
  delete(endpoint: any, data?: null | undefined) {
    return ajax(endpoint, 'DELETE', data)
  }
}

async function ajax(endpoint: any, method = 'GET', data = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: (method === 'GET') ? data : null
    })

    return res.data
  } catch (err) {
    console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`, data)
    console.dir(err)

    if ((err as AxiosError).response && (err as AxiosError).response?.status === 401) {
      sessionStorage.clear()
      window.location.assign('/')
    }
    throw err
  }
}


