import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ActionCreator } from 'redux'

import { AuthEndpoints } from './auth/auth.types'
import { OrganisationsEndpoints } from './organisations/organisations.types'
import { SkillsEndpoints } from './skills/skills.types'
import { UsersEndpoints } from './users/users.types'

export type GenerateEndpoint = (arr: string[]) => string

type Endpoints = AuthEndpoints | UsersEndpoints | SkillsEndpoints | OrganisationsEndpoints

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
export type ApiCall = CreateApiClient

export interface ApiMeta extends ApiClientMetaOverlap {
  isTokenRequired: boolean
  onSuccess: ActionCreator<any>
  onFailure: ActionCreator<any>
}

export type PrepareApiRequestData = Pick<ApiMeta, 'onSuccess' | 'onFailure'> & {
  apiArgs: ApiClientArgs
}
