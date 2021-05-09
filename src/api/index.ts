import axios from 'axios'
import { AUTH_TOKEN } from 'helpers/helpers'

import Env from '../env.json'
import * as apiConfig from './api.config'
import { FALLBACK_MESSAGE, REFRESH_TOKEN_FAILED_MESSAGE, UNAUTHORIZED_STATUS_CODE } from './api.constants'
import * as middleware from './api.middleware'
import auth from './auth/auth'
import digitalCv from './digitalCv'
import users from './users'

// TODO:
// - export an axios instance that takes an baseURL and initial headers.
// - this needs to be able to take an access token, via a redux middleware call when it needs it.
// - probably make use of a fp function so that we can pass auth token in at middleware time.
// - so we want a function that takes an base (user, auth, etc) and a method (login, etc) and accepts the auth token
// - we need to be able to build up the endpoints somehow
// - will handle errors in middleware
// - will handle getting / posting data through middleware

// reconsidered shape:
// middleware takes:
// - the instance < - this is passed into the client on creation.
// - the client
// - the action
// - a way to get auth (getAccessToken)
// - we then call this. But I don't think we can pass the client or action in via redux/middleware. We need a function
// - that takes the client and action as a string, and builds the call - and the client and action must be passed in via the action meta data

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

export { middleware, apiConfig }
