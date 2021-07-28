import { ApiClients, ApiMeta, ApiMethods } from '../api.types'

export const QUALIFICATIONS_CONFIG: Partial<ApiMeta> = {
  client: ApiClients.Qualifications,
  method: ApiMethods.Post,
  isTokenRequired: true,
}

export const QUALIFICATIONS_CREATE_CONFIG: Partial<ApiMeta> = QUALIFICATIONS_CONFIG
