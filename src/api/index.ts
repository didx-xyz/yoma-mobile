import axios from 'axios'

import auth from './auth'
import users from './users'

const FALLBACK_MESSAGE = 'Unable to reach server'
const REFRESH_TOKEN_FAILED_MESSAGE = 'Unable to refresh your session'
const UNAUTHORIZED_STATUS_CODE = 401
export const BASE_URL = 'https://staging.api.yoma.africa/api/v1/'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// TODO: Static token for now
instance.interceptors.request.use(
  async request => {
    request.headers = {
      ...request.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVXNlciIsInVuaXF1ZV9uYW1lIjoiNWYyNTg4NDYtNmEzYi00YjJmLThjY2YtYjI1MWJlYWMwNjZiIiwibmJmIjoxNjE3ODE5NTM1LCJleHAiOjE2MTc4MjEzMzUsImlhdCI6MTYxNzgxOTUzNX0.g0JmabcOEKxRk47pXWMtXKj9nUeIBD_qyt5M4uKNVeg`,
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
