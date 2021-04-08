import axios from 'axios'

import auth from './auth'
import users from './users'

const FALLBACK_MESSAGE = 'Unable to reach server'
const REFRESH_TOKEN_FAILED_MESSAGE = 'Unable to refresh your session'
const UNAUTHORIZED_STATUS_CODE = 401
const BASE_URL = 'https://staging.api.yoma.africa/api/v1/'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  async request => {
    request.headers = {
      ...request.headers,
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    }
    return request
  },
  async error => {
    return error
  },
)

instance.interceptors.response.use(
  async response => {
    return response.data
  },
  async ({ response }) => {
    if (response?.status === UNAUTHORIZED_STATUS_CODE) {
      return Promise.reject(REFRESH_TOKEN_FAILED_MESSAGE)
    }
    return Promise.reject((response && response.data?.meta?.message) || FALLBACK_MESSAGE)
  },
)

export default {
  auth: auth(instance),
  users: users(instance),
}
