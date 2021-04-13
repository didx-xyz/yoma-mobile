import axios from 'axios'
import { AUTH_TOKEN, BASE_URL } from 'helpers/helpers'

import Env from '../env.json'
import auth from './auth'
import digitalCv from './digitalCv'
import users from './users'

const FALLBACK_MESSAGE = 'Unable to reach server'
const REFRESH_TOKEN_FAILED_MESSAGE = 'Unable to refresh your session'
const UNAUTHORIZED_STATUS_CODE = 401

const instance = axios.create({
  baseURL: Env.YOMA_API_BASE_PATH,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  async request => {
    request.headers = {
      ...request.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AUTH_TOKEN}`,
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
  digitalCv: digitalCv(instance),
}
