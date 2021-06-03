import axios from 'axios'
import { AUTH_TOKEN } from 'helpers/helpers'
import { store } from 'redux/store'

import Env from '../env.json'
import * as apiConfig from './api.config'
import { FALLBACK_MESSAGE, REFRESH_TOKEN_FAILED_MESSAGE, UNAUTHORIZED_STATUS_CODE } from './api.constants'
import * as middleware from './api.middleware'
import { getTokenIfRequired } from './api.utils'
import auth from './auth/auth'
import digitalCv from './digitalCv'
import users from './users'

const instance = axios.create({
  baseURL: Env.YOMA_API_BASE_PATH,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  async request => {
    const { auth } = store.getState()
    request.headers = {
      ...request.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.token}`,
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

export { apiConfig, middleware }
