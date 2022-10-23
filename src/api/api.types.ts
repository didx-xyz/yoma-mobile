import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ActionCreator } from 'redux'

import { StdObj } from '~/types/general.types'

import { prepareApiRequest } from './api.utils'
import { types as AuthTypes } from './auth/'
import { types as EducationTypes } from './education'
import { types as OrgTypes } from './organisations'
import { types as SkillsTypes } from './skills'
import { types as UsersTypes } from './users'
import { types as WorkExperienceTypes } from './workExperience'

export type ApiEndpoints =
  | AuthTypes.AuthEndpoints
  | UsersTypes.UsersEndpoints
  | SkillsTypes.SkillsEndpoints
  | OrgTypes.OrganisationsEndpoints
  | WorkExperienceTypes.WorkExperienceEndpoints
  | EducationTypes.EducationEndpoints

export enum ApiClients {
  Auth = 'auth',
  Challenges = 'challenges',
  WorkExperience = 'workexperience',
  OAuth = 'connect',
  Organisations = 'organisations',
  Opportunities = 'opportunities',
  Education = 'education',
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
  urlSuffix?: string
  params?: Record<string, string | number>
  config?: Partial<AxiosRequestConfig>
}

export type ApiResponseStatus = number

export interface ApiResponseHeaders {
  'content-type': string
  date: string
  server: string
}

export interface ApiResponseMeta {
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
