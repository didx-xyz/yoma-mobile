import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ActionCreator } from 'redux'

import { StdObj } from '../types/general.types'
import { prepareApiRequest } from './api.utils'
import { types as AuthTypes } from './auth/'
import { types as OrgTypes } from './organisations'
import { types as SkillsTypes } from './skills'
import { types as UsersTypes } from './users'

export type ApiEndpoints =
  | AuthTypes.AuthEndpoints
  | UsersTypes.UsersEndpoints
  | SkillsTypes.SkillsEndpoints
  | OrgTypes.OrganisationsEndpoints

export enum ApiClients {
  Auth = 'auth',
  Challenges = 'challenges',
  Jobs = 'jobs',
  Organisations = 'organisations',
  Qualifications = 'qualifications',
  Skills = 'skills',
  Users = 'users',
}

export enum ApiMethods {
  Post = 'post',
  Put = 'put',
  Get = 'get',
  Patch = 'patch',
  Delete = 'delete',
}

export interface ApiClientMetaOverlap {
  client: ApiClients
  method: ApiMethods
  endpoint: ApiEndpoints | string[]
  headers: StdObj<string>
  additionalHeaders?: StdObj<string>
  params?: Record<string, string | number>
  config?: Partial<AxiosRequestConfig>
}

export interface ApiMetaResponse {
  success: boolean
  code: number
  message: string | null
}

export interface ApiClientArgs extends ApiClientMetaOverlap {
  token?: string
  data?: any
}
export type ApiClient = (args: ApiClientArgs) => Promise<AxiosResponse>
export type CreateApiClient = (instance: AxiosInstance) => ApiClient
export type ApiCall = CreateApiClient

export interface ApiMeta extends ApiClientMetaOverlap {
  isTokenRequired: boolean
  onSuccess: ActionCreator<any>
  onFailure: ActionCreator<any>
}

export type ApiRequestResponse = {
  payload: any | undefined
  meta: ApiMeta
}

export type ApiError = {
  onFailure: any
}
export type ApiErrorResponse = {
  payload: any | undefined
  meta: ApiError
}

export type PrepareApiRequestData = Pick<ApiMeta, 'onSuccess' | 'onFailure'> & {
  apiArgs: ApiClientArgs
}

export type ApiFlowDependencies = { api: ApiClient; prepArgs: typeof prepareApiRequest }
