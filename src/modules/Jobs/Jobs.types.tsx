import { ApiMetaResponse } from 'modules/Auth/Auth.types'

export interface Job {
  id: string
  title: string
  description: string
  createdAt: string
  createdByAdmin: boolean
  language: string
  published: boolean
  skills: string[]
}

export interface JobsResponse {
  data: { data: Job }
  meta: ApiMetaResponse
}

export interface JobsRequest {
  title: string
  description: string
  language: string
  published: boolean
  skillNames: string[]
  organisationId: string
  startTime: string | null
  endTime: string | null
}

export type JobsState = Job
