import { types as ApiTypes } from '~/api'

export interface WorkExperience {
  id: string
  title: string
  description: string
  createdAt: string
  createdByAdmin: boolean
  language: string
  published: boolean
  skills: string[]
}

export interface WorkExperienceResponse {
  data: { data: WorkExperience }
  meta: ApiTypes.ApiResponseMeta
}

export interface WorkExperienceRequest {
  title: string
  description: string
  language: string
  published: boolean
  skillNames: string[]
  organisationId: string
  startTime: string | null
  endTime: string | null
}

export type WorkExperienceState = WorkExperience
