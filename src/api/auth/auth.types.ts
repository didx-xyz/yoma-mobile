import { AxiosInstance } from 'axios'

import { ApiClientFn } from '../api.types'

export type AuthClient = (instance: AxiosInstance) => AuthClientApi

export type AuthClientApi = {
  login: ApiClientFn
  loginSocial: ApiClientFn
  register: ApiClientFn
  registerSocial: ApiClientFn
  resetPassword: ApiClientFn
}
