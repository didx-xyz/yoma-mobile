import axios, { AxiosInstance } from 'axios'

import Env from '../env.json'
import { ApiActionsAuth, ApiClients } from './api.types'

export const instance = axios.create({
  baseURL: Env.YOMA_API_BASE_PATH,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const createApiClient = (apiInstance: AxiosInstance) => (urlBase: string) => (urlAction: string) => (
  token: string,
) => (data: any) => {
  apiInstance.defaults.headers.Authorization = `Bearer ${token}`
  return apiInstance
}

export const apiInstancePost = createApiPostClient(instance)
export const apiInstanceGet = createApiGetClient(instance)

export const authClient = apiInstancePost('auth')
export const authLogin = authClient('login')

//usage authLogin(token)(data).then

export const doGetRequest = (apiInstance: AxiosInstance) => (client: ApiClients, endpoint: ApiActionsAuth) => (
  token: string,
) => (data: any) => {
  const apiEndpoint = `${client}/${endpoint}`
  apiInstance.defaults.headers.Authorization = `Bearer ${token}`
  return apiInstance.get(apiEndpoint, data)
}

export const doPostRequest = (apiInstance: AxiosInstance) => (client: ApiClients, endpoint: ApiActionsAuth) => (
  token: string,
) => (data: any) => {
  const apiEndpoint = `${client}/${endpoint}`
  apiInstance.defaults.headers.Authorization = `Bearer ${token}`
  return apiInstance.post(apiEndpoint, data)
}
