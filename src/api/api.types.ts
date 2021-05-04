import { AxiosRequestConfig, AxiosResponse } from 'axios'

export type GenerateEndpoint = (arr: string[]) => string
export type ApiClientFn = (body: Record<string, any>, config?: AxiosRequestConfig) => Promise<AxiosResponse>

export enum ApiClients {
  Auth = 'auth',
  Users = 'users',
  Organisations = 'organisations',
  Skills = 'skills',
  Jobs = 'jobs',
}

export enum ApiActionsAuth {
  Logon = 'login',
  LoginSocial = 'login-social',
  Register = 'register',
  RegisterSocial = 'register-social',
  PasswordReset = 'password-reset',
}
export enum ApiActionsUser {}
export enum ApiActionsOrganisation {}
export enum ApiActionsSkills {}
export enum ApiActionsJobs {}
