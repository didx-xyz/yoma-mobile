import { Skills } from 'modules/Skills/Skills.types'

export interface QualificationResponsePayload {
  skills: Skills
  id: string
  title: string
  description: string
  url: string
  createdAt: string
  zltoReward: number | null
  createdByAdmin: boolean
  language: string
  startTime: string
  endTime: string
  published: boolean
}

export interface QualificationResponseMeta extends QualificationResponsePayload {
  approvedCredentials: number
  countries: string[]
  rejectedCredentials: number
  skills: Skills
  skillsLearned: number
  totalZLTORewarded: number
  unverifiedCredentials: number
}

export type QualificationRequestPayload = {
  title: string
  description: string
  url: string
  language: string
  published: boolean
  organisationId: string
  skillNames: Skills
  country: string
  startTime: string | null
  endTime: string | null
}
