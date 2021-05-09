import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ActionCreator } from 'redux'

import { AuthEndpoints } from './auth/auth.types'
import { UsersEndpoints } from './users/users.types'

export type GenerateEndpoint = (arr: string[]) => string
export type ApiClientFn = (body: Record<string, any>, config?: AxiosRequestConfig) => Promise<AxiosResponse>

type Endpoints = AuthEndpoints | UsersEndpoints // &  add the rest of the methods for User, CV, etc

export enum ApiClients {
  Auth = 'auth',
  Users = 'users',
  Organisations = 'organisations',
  Skills = 'skills',
  Jobs = 'jobs',
}

export enum ApiMethods {
  Post = 'post',
  Put = 'put',
  Get = 'get',
  Patch = 'patch',
  Delete = 'delete',
}

interface ApiClientMetaOverlap {
  client: ApiClients
  method: ApiMethods
  endpoint: Endpoints
  params?: Record<string, string | number>
  config?: Partial<AxiosRequestConfig>
}

export interface ApiClientArgs extends ApiClientMetaOverlap {
  token?: string
  data?: any
}
export type ApiClient = (args: ApiClientArgs) => Promise<AxiosResponse>
export type CreateApiClient = (instance: AxiosInstance) => ApiClient
export type ApiRequest = CreateApiClient

export interface ApiMeta extends ApiClientMetaOverlap {
  requiresToken: boolean
  onSuccess: ActionCreator<any>
  onFailure: ActionCreator<any>
}

export type PrepareApiRequestData = Pick<ApiMeta, 'onSuccess' | 'onFailure'> & {
  apiArgs: ApiClientArgs
}
