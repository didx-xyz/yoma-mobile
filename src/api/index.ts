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

instance.interceptors.request.use(
  async request => {
    request.headers = {
      ...request.headers,
      'Content-Type': 'application/json',
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVXNlciIsInVuaXF1ZV9uYW1lIjoiNWYyNTg4NDYtNmEzYi00YjJmLThjY2YtYjI1MWJlYWMwNjZiIiwibmJmIjoxNjE3Nzc5MDkzLCJleHAiOjE2MTc3ODA4OTMsImlhdCI6MTYxNzc3OTA5M30.75DU1ni0lHAAd67jRTmZILFUiFCJixqlS-WxhsTn-C0`,
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
